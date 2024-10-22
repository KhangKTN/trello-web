import ModeSelect from '~/components/ModeSelect'
import Box from '@mui/material/Box'

function AppBar() {
    return (
        <Box sx={{
            backgroundColor: 'primary.light',
            height: (theme) => theme.appLayout.appBarHeight,
            display: 'flex',
            alignItems: 'center'
        }}>
            <ModeSelect/>
        </Box>
    )
}

export default AppBar