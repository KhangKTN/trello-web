import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCard({ cards }) {
    return (
        <SortableContext items={cards?.map(card => card._id)} strategy={verticalListSortingStrategy}>
            <Box
                sx={{
                    color: theme => (theme.palette.mode === 'light' ? 'dark' : 'white'),
                    padding: '0 4px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    maxHeight: theme =>
                        `calc(${theme.appLayout.boardContentHeight} - ${theme.spacing(5)} - ${
                            theme.appLayout.columnHeaderHeight
                        } - ${theme.appLayout.columnFooterHeight})`,
                    overflowX: 'hidden',
                    overflowY: 'auto'
                }}
            >
                {cards?.map(card => (
                    <Card key={card?._id} card={card} />
                ))}
                {/* <Card />
                <Card hideMedia /> */}
            </Box>
        </SortableContext>
    )
}

export default ListCard