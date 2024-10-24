import Box from '@mui/material/Box'

const BoardContent = () => {
    return (
        <Box sx={{
            backgroundColor: 'red',
            height: (theme) => `calc(100vh - (${theme.appLayout.appBarHeight} + ${theme.appLayout.boardBarHeight}))`
        }}>
            Board content
        </Box>
    )
}

export default BoardContent