import { Button, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import Divider from '@mui/material/Divider'
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp'

const Workspace = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Button
                id='basic-button-workspace'
                aria-controls={open ? 'basic-menu-workspace' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<ExpandMoreSharpIcon />}
                sx={{ color: 'white' }}
            >
                Workspace
            </Button>
            <Menu
                id='basic-menu-workspace'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button-workspace'
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <ContentCut fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                        ⌘X
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ContentCopy fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                        ⌘C
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ContentPaste fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                        ⌘V
                    </Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Cloud fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>Web Clipboard</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}

export default Workspace