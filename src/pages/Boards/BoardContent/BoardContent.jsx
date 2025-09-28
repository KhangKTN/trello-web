import {
    DndContext,
    DragOverlay,
    closestCorners,
    defaultDropAnimationSideEffects,
    getFirstCollision,
    pointerWithin,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import cloneDeep from 'lodash/cloneDeep'
import { useCallback, useEffect, useRef, useState } from 'react'
import boardApi from '~/apis/board.api'
import AddCardModal from '~/components/Modal/AddColumnModal/AddCardModal'
import { MouseSensor, TouchSensor } from '~/libraries/dnd-kit-sensors'
import formatterUtil from '~/utils/formatter.util'
import sortUtil from '~/utils/sort.util'
import { BOARD_ID } from '../_id'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCard/Card/Card'
import ListColumn from './ListColumns/ListColumn'

const DRAG_ITEM_TYPE = {
    CARD: 'DRAG_ITEM_CARD',
    COLUMN: 'DRAG_ITEM_COLUMN'
}

// Animation when drop element
const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: 0.5 // Placeholder have opacity until element drop complete. Otherwise, placeholder is disappear
            }
        }
    })
}

const BoardContent = ({ board }) => {
    const [sortedColumns, setSortedColumn] = useState([])
    const [_, setDragItemId] = useState(null)
    const [dragItemType, setDragItemType] = useState(null)
    const [dragItemData, setDragItemData] = useState(null)

    // First column contain card when drag
    const [sourceColumnDragCard, setSourceColumnDragCard] = useState(null)
    const lastOverId = useRef(null)

    // If use pointerSensor, must be use "touchAction: 'none'" for element dnd - [exists bug]
    // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

    // Move mouse least 10px to emit event
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

    // Press hold 250ms and tolerance 5 to emit event
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    const sensors = useSensors(mouseSensor, touchSensor)

    // console.log(sortedColumns[1])

    useEffect(() => {
        setSortedColumn(sortUtil.sortArrayByOtherArray(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])

    const findColumnByCardId = (cardId) => {
        return sortedColumns?.find((col) => col.cards.some((card) => card._id === cardId))
    }

    const handleDragStart = (e) => {
        const {
            id: elementId,
            data: { current: dataEvent }
        } = e.active
        setDragItemId(elementId)
        setDragItemType(dataEvent.columnId ? DRAG_ITEM_TYPE.CARD : DRAG_ITEM_TYPE.COLUMN)
        setDragItemData(dataEvent)

        // Save columnRoot contain card if element drag is card
        if (dataEvent?.columnId) {
            setSourceColumnDragCard(findColumnByCardId(elementId))
        }
    }

    /**
     * Handle drag card over other column
     */
    const handleDragOver = (e) => {
        if (dragItemType === DRAG_ITEM_TYPE.COLUMN) return
        const { active, over } = e
        if (!active || !over) return

        const {
            id: cardDragId,
            data: { current: cardDragData }
        } = active
        const { id: overId } = over
        const columnRoot = findColumnByCardId(cardDragId)
        const columnOver = findColumnByCardId(overId)

        if (!columnRoot || !columnOver) return

        // Only handle for case: Drag card to other column
        if (columnRoot?._id !== columnOver?._id) {
            moveCardToOtherColumn(columnRoot, columnOver, overId, active, over, cardDragId, cardDragData)
        }
    }

    const handleDragEnd = (e) => {
        const { active, over } = e
        if (!active || !over) return

        if (dragItemType === DRAG_ITEM_TYPE.CARD) {
            const {
                id: cardDragId,
                data: { current: cardDragData }
            } = active
            const { id: overId } = over

            const columnRoot = findColumnByCardId(cardDragId)
            const columnOver = findColumnByCardId(overId)
            if (!columnRoot || !columnOver) return

            /*
                Check if card is in a column
                If drag card in a column, only rearrange order of cards
                Otherwise, must remove card in root column and add it into new column (target column)
            */
            if (sourceColumnDragCard._id === columnOver._id) {
                // Get order of cards current and rearrange
                let cardOrderIds = columnOver.cardOrderIds
                cardOrderIds = arrayMove(cardOrderIds, cardOrderIds.indexOf(cardDragId), cardOrderIds.indexOf(overId))
                const idxColumn = sortedColumns.findIndex((col) => col._id === columnOver._id)

                // Set orderIds and cards for column occur event
                setSortedColumn((oldColumns) => {
                    const nextColumns = cloneDeep(oldColumns)
                    nextColumns[idxColumn].cardOrderIds = cardOrderIds
                    return nextColumns
                })

                // Update in db
                boardApi.updateCardOrderIds({
                    card: cardDragData,
                    sourceColumnId: columnOver._id,
                    targetColumnId: columnOver._id,
                    cardOrderIds: cardOrderIds
                })
            } else {
                moveCardToOtherColumn(columnRoot, columnOver, overId, active, over, cardDragId, cardDragData, true)
            }
        }

        if (dragItemType === DRAG_ITEM_TYPE.COLUMN) {
            const idColumnDrag = active?.id
            const idColumnDrop = over?.id
            if (idColumnDrag && idColumnDrop && idColumnDrag !== idColumnDrop) {
                let columnOrderIds = sortedColumns.map((col) => col._id)
                columnOrderIds = arrayMove(
                    columnOrderIds,
                    columnOrderIds.indexOf(idColumnDrag),
                    columnOrderIds.indexOf(idColumnDrop)
                )
                // Sort array use js splice
                // const idx = columnOrderIds.indexOf(idColumnDrop)
                // columnOrderIds = columnOrderIds.filter(colId => colId !== idColumnDrag)
                // columnOrderIds.splice(idx, 0, idColumnDrag)
                setSortedColumn(sortUtil.sortArrayByOtherArray([...sortedColumns], columnOrderIds, '_id'))

                boardApi.updateColumnOrderIds({ _id: BOARD_ID, columnOrderIds })
            }
        }

        setDragItemId(null)
        setDragItemType(null)
        setDragItemData(null)
        setSourceColumnDragCard(null)
    }

    const moveCardToOtherColumn = (
        columnRoot,
        columnOver,
        overId,
        active,
        over,
        cardDragId,
        cardDragData,
        isDragEnd
    ) => {
        setSortedColumn((prevColumns) => {
            const nextColumns = cloneDeep(prevColumns)
            const nextRootColumn = nextColumns?.find((c) => c._id === columnRoot._id)
            const nextOverColumn = nextColumns?.find((c) => c._id === columnOver._id)

            // Calc new index for card is dropped
            const overCardIdx = columnOver?.cards?.findIndex((c) => c._id === overId)
            const isBelowOverItem =
                active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
            const modifier = isBelowOverItem ? 1 : 0
            let newCardIdx = overCardIdx >= 0 ? overCardIdx + modifier : columnOver?.cards?.length + 1

            // Remove card from root column contain card is dragged
            if (nextRootColumn && columnRoot._id !== columnOver._id) {
                nextRootColumn.cards = nextRootColumn?.cards?.filter((c) => c._id !== cardDragId)
                nextRootColumn.cardOrderIds = nextRootColumn?.cards?.map((c) => c._id)

                // If card dragged is last item of the column, then add new empty card (placeholder-card)
                if (!nextRootColumn?.cards?.length) {
                    nextRootColumn.cards = [formatterUtil.createPlaceholderCard(nextRootColumn)]
                    nextRootColumn.cardOrderIds = [`${nextRootColumn._id}-placeholder-card`]
                }
            }
            // Add card to target column
            if (nextOverColumn) {
                // Remove card if it is exists
                nextOverColumn.cards = nextOverColumn?.cards?.filter((c) => c._id !== cardDragId)
                // Update new columnId
                cardDragData.columnId = columnOver._id

                /*
                    Add new card in target column and update orderCardIds
                    If column is empty (only contain card placeholder), then assign new array card
                    Else add new card into card list
                */
                if (nextOverColumn.cards?.length === 1 && nextOverColumn.cards[0].isPlaceholder) {
                    nextOverColumn.cards = [cardDragData]
                    nextOverColumn.cardOrderIds = [cardDragData._id]
                } else {
                    nextOverColumn.cards = nextOverColumn?.cards?.toSpliced(newCardIdx, 0, cardDragData)
                    nextOverColumn.cardOrderIds = nextOverColumn?.cards?.map((c) => c._id)
                }
            }

            // Api update orderIds
            if (isDragEnd) {
                boardApi.updateCardOrderIds({
                    card: { ...cardDragData, columnId: columnOver._id },
                    sourceColumnId: sourceColumnDragCard._id,
                    targetColumnId: columnOver._id,
                    cardOrderIds: nextOverColumn.cardOrderIds
                })
            }

            return nextColumns
        })
    }

    const collisionDetectionStratery = useCallback(
        (args) => {
            if (dragItemType === DRAG_ITEM_TYPE.COLUMN) {
                return closestCorners({ ...args })
            }
            const pointerIntersection = pointerWithin(args)
            if (!pointerIntersection?.length) return
            // const intersections = pointerIntersection?.length > 0 ? pointerIntersection : rectIntersection(args)

            // Find first overId in intersections
            let overId = getFirstCollision(pointerIntersection, 'id')
            if (overId) {
                const intersecColumn = sortedColumns.find((col) => col._id === overId)
                if (intersecColumn) {
                    // console.log('overId before:', overId)
                    overId = closestCorners({
                        ...args,
                        droppableContainers: args.droppableContainers.filter((container) => {
                            return container.id !== overId && intersecColumn?.cardOrderIds?.includes(container.id)
                        })
                    })[0]?.id
                }
                lastOverId.current = overId
                return [{ id: overId }]
            }
            return lastOverId.current ? [{ id: lastOverId.current }] : []
        },
        [dragItemType, sortedColumns]
    )

    const componentMap = {
        [DRAG_ITEM_TYPE.COLUMN]: <Column column={dragItemData} />,
        [DRAG_ITEM_TYPE.CARD]: <Card card={dragItemData} />
    }

    return (
        <>
            <AddCardModal />
            <DndContext
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                sensors={sensors}
                collisionDetection={collisionDetectionStratery} // Collision detection algorithm, fix case cannot drag card large
            >
                <Box
                    sx={{
                        backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#d1c4e9' : '#49535f'),
                        height: (theme) => theme.appLayout.boardContentHeight,
                        padding: '8px 0'
                    }}
                >
                    <ListColumn columns={sortedColumns} />
                    <DragOverlay dropAnimation={dropAnimation}>
                        {dragItemType && componentMap[dragItemType]}
                    </DragOverlay>
                </Box>
            </DndContext>
        </>
    )
}

export default BoardContent
