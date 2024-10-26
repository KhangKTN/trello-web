import React from 'react'
import Check from '@mui/icons-material/Check'
import ExpandMoreSharp from '@mui/icons-material/ExpandMoreSharp'
import { Box, Button, Menu } from '@mui/material'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'

const Template = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box sx={{ display: { md: 'none', lg: 'block' } }}>
            <Button
                id="basic-button-template"
                aria-controls={open ? 'basic-menu-template' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<ExpandMoreSharp/>}
                sx={{ color: 'white' }}
            >
                Template
            </Button>
            <Menu
                sx={{ width: 320 }}
                id="basic-menu-template"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button-template'
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
        </Box>
    )
}

export default Template