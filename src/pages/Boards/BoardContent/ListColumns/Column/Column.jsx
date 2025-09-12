import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
    AddCard,
    Archive,
    Close,
    CopyAll,
    DeleteForever,
    Done,
    DragHandle,
    ExpandMoreOutlined
} from '@mui/icons-material'
import ExpandMoreSharp from '@mui/icons-material/ExpandMoreSharp'
import { LoadingButton } from '@mui/lab'
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import toast from 'react-hot-toast'
import boardApi from '~/apis/board.api'
import { BOARD_ID } from '~/pages/Boards/_id'
import useBoardStore from '~/stores/useBoardStore'
import useLastCardAddedStore from '~/stores/useColumnsAddCardStore'
import sortUtil from '~/utils/sort.util'
import ListCard from './ListCard/ListCard'

const stylePlaceholder = {
    // border: '2.5px dashed green',
    opacity: 0.5,
    borderRadius: '8px'
}

const Column = ({ column }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [isShowForm, setShowForm] = useState(false)
    const [newCardName, setNewCardName] = useState({ value: '', errMsg: '' })
    const [isFetching, setFetching] = useState(false)

    const addCard = useBoardStore((state) => state.addCard)
    const changeColumnIds = useLastCardAddedStore((state) => state.changeColumnIds)

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

    const toggleShowForm = () => {
        setShowForm(!isShowForm)
    }

    const addNewCard = async () => {
        if (!newCardName.value) {
            setNewCardName({ value: '', errMsg: 'Column name is not blank' })
            return
        }

        setFetching(true)
        const card = { title: newCardName.value, boardId: BOARD_ID, columnId: column._id }

        try {
            const res = await boardApi.addCard(card)
            toast.success(res?.data?.message)
            addCard(res?.data?.data)
            changeColumnIds(column._id)

            setNewCardName({ value: '', errMsg: '' })
            setShowForm(false)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            setFetching(false)
        }
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
                                endicon={<ExpandMoreSharp />}
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
                        p: '8px 4px'
                    }}
                >
                    {isShowForm ? (
                        <Box
                            sx={{
                                height: '100%',
                                bgcolor: 'transparent',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                columnGap: 1
                            }}
                        >
                            <TextField
                                id='outlined-search'
                                label='Enter name card...'
                                type='text'
                                size='small'
                                autoFocus
                                value={newCardName.value}
                                onChange={(e) => setNewCardName({ value: e.target.value, errMsg: '' })}
                                error={Boolean(newCardName.errMsg)}
                                helperText={newCardName.errMsg}
                                data-no-dnd
                                sx={{
                                    width: '100%',
                                    marginLeft: { xs: '12px', sm: 0 },
                                    borderColor: 'white',
                                    '& label, input': { color: 'primary.text' },
                                    '& label.Mui-focused': { color: 'primary.text' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'primary.text' },
                                        '&:hover fieldset': { borderColor: 'primary.text' },
                                        '&.Mui-focused fieldset': { borderColor: 'primary.text' }
                                    }
                                }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                                <LoadingButton
                                    loading={isFetching}
                                    loadingPosition='start'
                                    startIcon={<Done />}
                                    onClick={() => addNewCard()}
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        '&:hover': { opacity: 0.8, backgroundColor: 'primary.main' }
                                    }}
                                    variant='contained'
                                >
                                    <span>OK</span>
                                </LoadingButton>
                                <Close
                                    onClick={() => toggleShowForm()}
                                    sx={{
                                        cursor: 'pointer',
                                        color: (theme) => theme.palette.error.light,
                                        '&:hover': { opacity: 0.8 }
                                    }}
                                />
                            </Box>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Button
                                onClick={() => toggleShowForm()}
                                sx={{ color: 'primary.text' }}
                                startIcon={<AddCard />}
                            >
                                Add new card
                            </Button>
                            <Tooltip title='Drag to move'>
                                <DragHandle sx={{ cursor: 'pointer' }} />
                            </Tooltip>
                        </Box>
                    )}
                </Box>
            </Box>
        </div>
    )
}

export default Column
