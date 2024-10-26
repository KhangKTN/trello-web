import Check from '@mui/icons-material/Check'
import ExpandMoreSharp from '@mui/icons-material/ExpandMoreSharp'
import { Button, Menu } from '@mui/material'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import React from 'react'

const Recent = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)
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
                id="basic-button-recent"
                aria-controls={open ? 'basic-menu-recent' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<ExpandMoreSharp/>}
                sx={{ color: 'white' }}
            >
                Recent
            </Button>
            <Menu
                sx={{ width: 320 }}
                id="basic-menu-recent"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button-recent'
                }}
            >
                <MenuList>
                    <MenuItem>
                        <ListItemText inset>Single</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText inset>1.15</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText inset>Double</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Check />
                        </ListItemIcon>
                        Custom: 1.2
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemText>Add space before paragraph</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText>Add space after paragraph</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemText>Custom spacing...</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}

export default Recent