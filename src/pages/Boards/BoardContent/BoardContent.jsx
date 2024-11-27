import { DndContext, DragOverlay, MouseSensor, TouchSensor, closestCorners, defaultDropAnimationSideEffects, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { sortArrayByOtherArray } from '~/utils/sort'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCard/Card/Card'
import ListColumn from './ListColumns/ListColumn'
import _ from 'lodash'

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
    const [dragItemId, setDragItemId] = useState(null)
    const [dragItemType, setDragItemType] = useState(null)
    const [dragItemData, setDragItemData] = useState(null)

    // If use pointerSensor, muse be use "touchAction: 'none'" for element dnd - [exists bug]
    // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

    // Move mouse least 10px to emit event
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

    // Press hold 250ms and tolerance 5 to emit event
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
    const sensors = useSensors(mouseSensor, touchSensor)

    useEffect(() => {
        setSortedColumn(sortArrayByOtherArray(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])

    const findColumnByCardId = (cardId) => {
        return sortedColumns?.find((col) => col.cards.filter((card) => card._id === cardId).length > 0)
    }

    const handleDragStart = (e) => {
        const dataEvent = e?.active?.data?.current
        setDragItemId(e?.active?.id)
        setDragItemType(dataEvent.columnId ? DRAG_ITEM_TYPE.CARD : DRAG_ITEM_TYPE.COLUMN)
        setDragItemData(dataEvent)
    }

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
            setSortedColumn(prevCols => {
                const overCardIdx = columnOver?.cards?.findIndex((c) => c._id === overId)

                // Calc index for new position
                let newCardIdx
                const isBelowOverItem =
                    active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height
                const modifier = isBelowOverItem ? 1 : 0
                newCardIdx = overCardIdx >= 0 ? overCardIdx + modifier : columnOver?.cards?.length + 1

                const nextColumns = _.cloneDeep(prevCols)
                const nextRootColumn = nextColumns.find((col) => col._id === columnRoot?._id)
                const nextOverColumn = nextColumns.find((col) => col._id === columnOver?._id)
                if (nextRootColumn) {
                    // Remove card from column contain card is dragged
                    nextRootColumn.cards = nextRootColumn?.cards?.filter((c) => c._id !== cardDragId)
                    nextRootColumn.cardOrderIds = nextRootColumn?.cards?.map((c) => c._id)
                }
                if (nextOverColumn) {
                    // Remove card if it is exists
                    nextOverColumn.cards = nextOverColumn?.cards?.filter((c) => c._id !== cardDragId)
                    // Add card is dragging into new index
                    nextOverColumn.cards = nextOverColumn?.cards?.toSpliced(newCardIdx, 0, cardDragData)
                    nextOverColumn.cardOrderIds = nextOverColumn?.cards?.map((c) => c._id)
                }

                return nextColumns
            })
        }
    }

    const handleDragEnd = (e) => {
        const idColumnDrag = e.active?.id
        const idColumnDrop = e.over?.id
        if (idColumnDrag && idColumnDrop && idColumnDrag !== idColumnDrop) {
            let columnOrderIds = sortedColumns.map((col) => col._id)
            // Sort array use lib
            columnOrderIds = arrayMove(
                columnOrderIds,
                columnOrderIds.indexOf(idColumnDrag),
                columnOrderIds.indexOf(idColumnDrop)
            )
            // Sort array use splice
            // const idx = columnOrderIds.indexOf(idColumnDrop)
            // columnOrderIds = columnOrderIds.filter(colId => colId !== idColumnDrag)
            // columnOrderIds.splice(idx, 0, idColumnDrag)
            setSortedColumn(sortArrayByOtherArray([...sortedColumns], columnOrderIds, '_id'))
        }
        setDragItemId(null)
        setDragItemType(null)
        setDragItemData(null)
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            collisionDetection={closestCorners} // Collision detection algorithm, fix case cannot drag card large
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
                    {!dragItemType ? null : dragItemType === DRAG_ITEM_TYPE.COLUMN ? (
                        <Column column={dragItemData} />
                    ) : (
                        <Card card={dragItemData} />
                    )}
                </DragOverlay>
            </Box>
        </DndContext>
    )
}

export default BoardContent
