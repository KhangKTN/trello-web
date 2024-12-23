import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined'
import AutoModeIcon from '@mui/icons-material/AutoMode'
import DashboardCustomize from '@mui/icons-material/DashboardCustomize'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import LockIcon from '@mui/icons-material/Lock'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Tooltip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { capitalizeFirstLetter } from '~/utils/formatter'

const MENU_STYLE = {
    color: 'white',
    paddingX: 1,
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover': {
        opacity: .8
    }
}

const BoardBar = ({ board }) => {
    return (
        <Box
            sx={{
                height: (theme) => theme.appLayout.boardBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                overflowX: 'auto',
                borderTop: '.5px solid',
                borderBottom: '.5px solid',
                borderColor: 'white',
                paddingX: 3,
                backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#9575cd' : '#49535f')
            }}
        >
            <Box sx={{ display: 'flex', columnGap: 2 }}>
                <Chip
                    sx={MENU_STYLE}
                    icon={<DashboardCustomize />}
                    label={board?.title}
                    clickable
                    onClick={() => {}}
                ></Chip>
                {board?.type && (
                    <Chip
                        sx={MENU_STYLE}
                        icon={<LockIcon />}
                        label={capitalizeFirstLetter(board?.type)}
                        clickable
                        onClick={() => {}}
                    ></Chip>
                )}
                <Chip
                    sx={MENU_STYLE}
                    icon={<AddToDriveOutlinedIcon />}
                    label='Add Drive'
                    clickable
                    onClick={() => {}}
                ></Chip>
                <Chip sx={MENU_STYLE} icon={<AutoModeIcon />} label='Automation' clickable onClick={() => {}}></Chip>
                <Chip sx={MENU_STYLE} icon={<FilterAltIcon />} label='Filter' clickable onClick={() => {}}></Chip>
            </Box>
            <Box sx={{ display: 'flex', columnGap: 2 }}>
                <Button
                    startIcon={<PersonAddIcon />}
                    variant='outlined'
                    sx={{
                        marginLeft: 2,
                        paddingX: 2,
                        borderColor: 'white',
                        color: 'white'
                    }}
                >
                    Invite
                </Button>
                <AvatarGroup
                    sx={{
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            fontSize: 16,
                            borderColor: 'white',
                            borderWidth: '1.5px'
                        }
                    }}
                    spacing={8}
                    max={5}
                    total={100}
                >
                    <Tooltip title='Hello'>
                        <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                    </Tooltip>
                    <Tooltip title='Hello'>
                        <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
                    </Tooltip>
                    <Tooltip title='Hello'>
                        <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                    </Tooltip>
                    <Tooltip title='Hello'>
                        <Avatar alt='Agnes Walker' src='/static/images/avatar/4.jpg' />
                    </Tooltip>
                    <Tooltip title='Hello'>
                        <Avatar alt='Trevor Henderson' src='/static/images/avatar/5.jpg' />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
}

export default BoardBar