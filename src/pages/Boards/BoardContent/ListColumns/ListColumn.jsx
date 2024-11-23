import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import AddchartIcon from '@mui/icons-material/Addchart'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

const ListColumn = ({ columns }) => {
    return (
        <SortableContext items={columns?.map((col) => col._id)} strategy={horizontalListSortingStrategy}>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    width: '100%',
                    height: '100%',
                    px: '12px'
                }}
            >
                {/* <Column />
                <Column /> */}
                {columns?.map((column) => (
                    <Column key={column?._id} column={column} />
                ))}
                <Box
                    sx={{
                        minWidth: '200px',
                        maxWidth: '200px',
                        height: 'fit-content',
                        mx: 2,
                        bgcolor: 'primary.main',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}
                >
                    <Button sx={{ color: 'white', width: '100%', py: 1 }} startIcon={<AddchartIcon />}>
                        Add new column
                    </Button>
                </Box>
            </Box>
        </SortableContext>
    )
}

export default ListColumn
