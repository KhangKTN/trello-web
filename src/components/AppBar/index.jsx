import ModeSelect from '~/components/ModeSelect'
import Box from '@mui/material/Box'
import GridViewIcon from '@mui/icons-material/GridView'
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Badge, Button, TextField, Tooltip, Typography } from '@mui/material'
import Workspace from './Menus/Workspace'
import Recent from './Menus/Recent'
import Template from './Menus/Template'
import Starred from './Menus/Starred'
import Account from './Menus/Account'

function AppBar() {
    return (
        <Box
            px={3}
            sx={{
                height: (theme) => theme.appLayout.appBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                overflowX: 'auto'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1.5 }}>
                <GridViewIcon sx={{ color: 'primary.dark' }}/>
                <Box sx={{ display: 'flex', columnGap: .5 }}>
                    <SpaceDashboardSharpIcon fontSize='medium' sx={{ color: 'primary.dark' }}/>
                    <Typography variant='span' sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Trello</Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Workspace/>
                    <Recent/>
                    <Starred/>
                    <Template/>
                    <Button variant="outlined">Create</Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1.5 }}>
                <TextField id="outlined-search" label="Search..." type="search" size='small' sx={{ minWidth: '120px', marginLeft: { xs: '12px', sm: 0 } }}/>
                <ModeSelect/>
                <Tooltip title='Notifications'>
                    <Badge badgeContent={1} variant='dot' sx={{ cursor: 'pointer' }} color='error'>
                        <NotificationsNoneIcon sx={{ color: 'primary.main' }}/>
                    </Badge>
                </Tooltip>
                <HelpOutlineIcon sx={{ color: 'primary.main' }}/>
                <Account/>
            </Box>
        </Box>
    )
}

export default AppBar