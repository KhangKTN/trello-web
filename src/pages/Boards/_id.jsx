import Container from '@mui/material/Container'
import { useEffect } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import useFetchBoardStore from '~/stores/useBoardStore'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

export const BOARD_ID = '689aeef56575c0d001cdb253'

function Board() {
    const board = useFetchBoardStore((state) => state.board)
    const fetchBoard = useFetchBoardStore((state) => state.fetchData)

    useEffect(() => {
        fetchBoard()
    }, [])

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent board={board} />
        </Container>
    )
}

export default Board
