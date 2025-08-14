import { Close, Search } from '@mui/icons-material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp'
import { Badge, Button, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useState } from 'react'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import Account from './Menus/Account'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Template from './Menus/Template'
import Workspace from './Menus/Workspace'

function AppBar() {
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <Box
            px={3}
            sx={{
                height: (theme) => theme.appLayout.appBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                overflowX: 'auto',
                // backgroundColor: (theme) => theme.palette.mode === 'light' ? '' : ''
                backgroundColor: 'primary.main'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1.5 }}>
                {/* <GridViewIcon sx={{ color: 'primary.dark' }}/> */}
                <Box sx={{ display: 'flex', columnGap: 0.5 }}>
                    <SpaceDashboardSharpIcon fontSize='medium' sx={{ color: 'white' }} />
                    <Typography variant='span' sx={{ fontWeight: 'bold', color: 'white' }}>
                        Trello
                    </Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, columnGap: 1 }}>
                    <Workspace />
                    <Recent />
                    <Starred />
                    <Template />
                    <Button
                        startIcon={<AddOutlinedIcon />}
                        sx={{
                            color: 'white',
                            borderColor: 'white'
                        }}
                        variant='outlined'
                    >
                        Create
                    </Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1.5 }}>
                <TextField
                    id='outlined-search'
                    label='Search...'
                    type='text'
                    size='small'
                    value={searchValue}
                    onChange={handleSearch}
                    sx={{
                        minWidth: '120px',
                        maxWidth: '200px',
                        marginLeft: { xs: '12px', sm: 0 },
                        borderColor: 'white',
                        '& label, input': { color: 'white' },
                        '& label.Mui-focused': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset': { borderColor: 'white' },
                            '&.Mui-focused fieldset': { borderColor: 'white' }
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Search sx={{ color: 'white' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment sx={{ display: searchValue ? 'default' : 'none' }} position='end'>
                                <Close
                                    onClick={() => setSearchValue('')}
                                    color='white'
                                    fontSize='small'
                                    sx={{ cursor: 'pointer', '&:hover': { color: 'red' } }}
                                />
                            </InputAdornment>
                        )
                    }}
                />
                <ModeSelect />
                <Tooltip title='Notifications'>
                    <Badge badgeContent={1} variant='dot' sx={{ cursor: 'pointer' }} color='error'>
                        <NotificationsNoneIcon sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip>
                <HelpOutlineIcon sx={{ color: 'white' }} />
                <Account />
            </Box>
        </Box>
    )
}

export default AppBar
