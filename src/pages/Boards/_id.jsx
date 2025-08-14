import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import boardApi from '~/apis/board.api'
import { mockData } from '~/apis/mock-data'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

function Board() {
    const [board, setBoard] = useState(null)

    const fetchBoardData = async (boardId) => {
        const board = await boardApi.fetchBoardDetail(boardId)
        setBoard(board.data)
    }

    useEffect(() => {
        const boardId = '689aeef56575c0d001cdb253'
        fetchBoardData(boardId)
    }, [])

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent board={mockData.board} />
        </Container>
    )
}

export default Board
