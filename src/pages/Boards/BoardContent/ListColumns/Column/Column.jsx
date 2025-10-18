import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AddCard from '@mui/icons-material/AddCard'
import CopyAll from '@mui/icons-material/CopyAll'
import DeleteForever from '@mui/icons-material/DeleteForever'
import DragHandle from '@mui/icons-material/DragHandle'
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import useBoardStore from '~/stores/useBoardStore'
import useCardModal from '~/stores/useCardModal'
import useConfirmDialogStore from '~/stores/useConfirmDialogStore'
import sortUtil from '~/utils/sort.util'
import ListCard from './ListCard/ListCard'

const stylePlaceholder = {
    // border: '2.5px dashed green',
    opacity: 0.5,
    borderRadius: '8px'
}

const Column = ({ column }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const changeModal = useCardModal((state) => state.change)
    const useBoard = useBoardStore((state) => state)
    const useConfirmDialog = useConfirmDialogStore((state) => state)

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column._id,
        data: { ...column },
        transition: {
            duration: 500,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
        }
    })

    // Use css for element is dragging
    const dndKitColumnStyle = {
        height: '100%',
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

    const handleRemoveColumn = () => {
        useConfirmDialog.change({
            isOpen: true,
            title: 'Do you want delete this column?',
            content: 'This action will permanently delete the Column. Do you want to continue?',
            action: () => useBoard.deleteColumn(column._id)
        })
        handleClose()
    }

    const sortedCard = sortUtil.sortArrayByOtherArray(column?.cards, column?.cardOrderIds, '_id')

    return (
        <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
            <Box
                {...listeners} // Only listen event on Column (Not full height of Column)
                sx={{
                    maxWidth: '300px',
                    minWidth: '300px',
                    backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#f0f0f0' : '#2a3543'),
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
                            <MenuItem
                                onClick={() => {
                                    changeModal({ isOpen: true, columnId: column._id, card: null })
                                    handleClose()
                                }}
                            >
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
                            <MenuItem
                                sx={{
                                    '&:hover': {
                                        color: 'error.main',
                                        '& .delete-forever-icon': { color: 'error.main' }
                                    }
                                }}
                                onClick={handleRemoveColumn}
                            >
                                <ListItemIcon>
                                    <DeleteForever className='delete-forever-icon' fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Remove</ListItemText>
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
                        p: '8px 4px'
                    }}
                >
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Button
                            onClick={() => changeModal({ isOpen: true, columnId: column._id, card: null })}
                            sx={{ color: 'primary.text' }}
                            startIcon={<AddCard />}
                        >
                            Add new card
                        </Button>
                        <Tooltip title='Drag to move'>
                            <DragHandle sx={{ cursor: 'pointer' }} />
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default Column
