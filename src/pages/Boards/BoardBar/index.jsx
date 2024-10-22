import Box from '@mui/material/Box'

const BoardBar = () => {
    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            height: (theme) => theme.appLayout.boardBarHeight,
            display: 'flex',
            alignItems: 'center'
        }}>
            Board Bar
        </Box>
    )
}

export default BoardBar