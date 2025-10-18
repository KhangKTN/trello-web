import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import DeleteForever from '@mui/icons-material/DeleteForever'
import ModeEditOutline from '@mui/icons-material/ModeEditOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
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

const stylePlaceholder = {
    border: '2.5px dashed #673ab7',
    opacity: 0.5,
    borderRadius: '8px'
}

const Card = ({ card }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const changeCardStore = useCardModal((state) => state.change)
    const deleteCard = useBoardStore((state) => state.deleteCard)
    const useConfirmDialog = useConfirmDialogStore((state) => state)

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: card._id,
        data: { ...card },
        transition: {
            duration: 500,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
        }
    })

    const dndKitColumnStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
        ...(isDragging && stylePlaceholder)
        // touchAction: 'none'
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDeleteCard = () => {
        useConfirmDialog.change({
            isOpen: true,
            title: 'Do you want delete this card?',
            content: 'This action will permanently delete the Card. Do you want to continue?',
            action: () => deleteCard(card)
        })
        handleClose()
    }

    return (
        <MuiCard
            ref={setNodeRef}
            style={dndKitColumnStyle}
            {...attributes}
            {...listeners}
            sx={{
                overflow: 'unset',
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                display: card?.isPlaceholder ? 'none' : 'block',
                border: '1px solid transparent',
                '&:hover': {
                    borderColor: (theme) => theme.palette.primary.main
                }
            }}
        >
            {card?.image ? (
                <CardMedia
                    sx={{ borderRadius: '4px 4px 0 0', aspectRatio: '16/9' }}
                    component='img'
                    alt='card-img'
                    image={card.image}
                />
            ) : null}
            <CardContent>
                <Typography variant='h6' sx={{ fontSize: '1rem' }} component='div'>
                    {card?.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {card?.desciption}
                </Typography>
            </CardContent>
            <CardActions sx={{ p: '0 4px 8px 4px', display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Button size='small' sx={{ color: 'primary.text' }} startIcon={<PeopleOutlinedIcon />}>
                        {card?.memberIds?.length ?? 0}
                    </Button>
                    <Button size='small' sx={{ color: 'primary.text' }} startIcon={<CommentOutlinedIcon />}>
                        {card?.comments?.length ?? 0}
                    </Button>
                </Box>
                <Tooltip title='More option'>
                    <MoreVertIcon
                        sx={{ cursor: 'pointer', color: 'text.primary' }}
                        id='button-card'
                        aria-controls={open ? 'menu-card' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    />
                </Tooltip>
                <Menu
                    id='menu-card'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'button-card'
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            changeCardStore({ isOpen: true, columnId: card.columnId, card: card })
                            handleClose()
                        }}
                    >
                        <ListItemIcon>
                            <ModeEditOutline sx={{ width: '18px', height: '18px' }} />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem
                        onClick={() => handleDeleteCard()}
                        size='small'
                        sx={{
                            '&:hover': {
                                color: 'error.main',
                                '& .delete-forever-icon': { color: 'error.main' }
                            }
                        }}
                    >
                        <ListItemIcon>
                            <DeleteForever className='delete-forever-icon' sx={{ width: '18px', height: '18px' }} />
                        </ListItemIcon>
                        <ListItemText>Remove</ListItemText>
                    </MenuItem>
                </Menu>
            </CardActions>
        </MuiCard>
    )
}

export default Card
