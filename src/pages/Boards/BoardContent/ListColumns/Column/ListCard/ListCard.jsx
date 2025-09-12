import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useEffect, useRef } from 'react'
import useLastCardAddedStore from '~/stores/useColumnsAddCardStore'
import Card from './Card/Card'

const ListCard = ({ cards }) => {
    const ref = useRef(null)
    const columnIds = useLastCardAddedStore((state) => state.columnIds)

    useEffect(() => {
        if (ref?.current && columnIds.includes(cards[0]?.columnId)) {
            ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' })
        }
    }, [columnIds])

    return (
        <SortableContext items={cards?.map((card) => card._id)} strategy={verticalListSortingStrategy}>
            <Box
                ref={ref}
                sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? 'dark' : 'white'),
                    padding: '0 4px 6px 4px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    maxHeight: (theme) =>
                        `calc(${theme.appLayout.boardContentHeight} - ${theme.spacing(5)} - ${
                            theme.appLayout.columnHeaderHeight
                        } - ${theme.appLayout.columnFooterHeight})`,
                    overflowX: 'hidden',
                    overflowY: 'auto'
                }}
            >
                {cards?.map((card) => (
                    <Card key={card?._id} card={card} />
                ))}
                {/* <Card />
                <Card hideMedia /> */}
            </Box>
        </SortableContext>
    )
}

export default ListCard
