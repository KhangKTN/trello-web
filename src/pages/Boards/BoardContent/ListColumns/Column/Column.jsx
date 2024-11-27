import { AddCard, Archive, CopyAll, DeleteForever, DragHandle, ExpandMoreOutlined } from '@mui/icons-material'
import ExpandMoreSharp from '@mui/icons-material/ExpandMoreSharp'
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import ListCard from './ListCard/ListCard'
import { sortArrayByOtherArray } from '~/utils/sort'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const stylePlaceholder = {
    border: '2.5px dashed green',
    opacity: .5,
    borderRadius: '8px'
}

const Column = ({ column }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column._id,
        data: { ...column },
        transition: {
            duration: 500,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
        }
    })

    // Use css for element is draging
    const dndKitColumnStyle = {
        height: 'fit-content',
        transform: CSS.Translate.toString(transform),
        transition,
        ...(isDragging && stylePlaceholder)
        // touchAction: 'none'
    }

    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const sortedCard = sortArrayByOtherArray(column?.cards, column?.cardOrderIds, '_id')

    return (
        <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
            <Box
                {...listeners} // Only listen event on Column (Not full height of Column)
                sx={{
                    maxWidth: '300px',
                    minWidth: '300px',
                    backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#f0f0f0' : 'primary.main'),
                    p: '0 4px',
                    borderRadius: '8px',
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.appLayout.boardContentHeight} - ${theme.spacing(5)})`,
                    overflowX: 'hidden',
                    overflowY: 'auto'
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        height: (theme) => theme.appLayout.columnHeaderHeight,
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography
                        variant='h2'
                        sx={{ fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', color: 'primary.text' }}
                    >
                        {column.title}
                    </Typography>
                    <Box>
                        <Tooltip title='More option'>
                            <ExpandMoreOutlined
                                sx={{ cursor: 'pointer', color: 'text.primary' }}
                                id='button-column'
                                aria-controls={open ? 'menu-column' : undefined}
                                aria-haspopup='true'
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                endIcon={<ExpandMoreSharp />}
                            />
                        </Tooltip>
                        <Menu
                            id='menu-column'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'button-column'
                            }}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <AddCard fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Add new Card</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <CopyAll fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <DeleteForever fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Remove</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Archive fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Archive</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
                {/* Body */}
                {/* <ListCard /> */}
                <ListCard cards={sortedCard} />
                {/* Footer */}
                <Box
                    sx={{
                        height: (theme) => theme.appLayout.columnFooterHeight,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button sx={{ color: 'primary.text' }} startIcon={<AddCard />}>
                        Add new card
                    </Button>
                    <Tooltip title='Drag to move'>
                        <DragHandle sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                </Box>
            </Box>
        </div>
    )
}

export default Column
