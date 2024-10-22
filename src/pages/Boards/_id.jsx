import Container from '@mui/material/Container'
import BoardContent from './BoardContent'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'

function Board() {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar/>
            <BoardBar/>
            <BoardContent/>
        </Container>
    )
}

export default Board