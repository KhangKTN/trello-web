import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { sortArrayByOtherArray } from '~/utils/sort'
import ListColumn from './ListColumns/ListColumn'


const BoardContent = ({ board }) => {
    const [sortedColumns, setSortedColumn] = useState([])

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

    const handleDragEnd = (e) => {
        const idColumnDrag = e.active?.id
        const idColumnDrop = e.over?.id
        if (idColumnDrag && idColumnDrop && idColumnDrag !== idColumnDrop) {
            let columnOrderIds = sortedColumns.map(col => col._id)
            // Sort array use lib
            columnOrderIds = arrayMove(columnOrderIds, columnOrderIds.indexOf(idColumnDrag), columnOrderIds.indexOf(idColumnDrop))
            // Sort array use splice
            // const idx = columnOrderIds.indexOf(idColumnDrop)
            // columnOrderIds = columnOrderIds.filter(colId => colId !== idColumnDrag)
            // columnOrderIds.splice(idx, 0, idColumnDrag)
            setSortedColumn(sortArrayByOtherArray([...sortedColumns], columnOrderIds, '_id'))
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <Box
                sx={{
                    backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#d1c4e9' : '#49535f'),
                    height: (theme) => theme.appLayout.boardContentHeight,
                    padding: '8px 0'
                }}
            >
                <ListColumn columns={sortedColumns} />
            </Box>
        </DndContext>
    )
}

export default BoardContent
