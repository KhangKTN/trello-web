import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined'
import InsertCommentIcon from '@mui/icons-material/InsertComment'
import ModeEditOutline from '@mui/icons-material/ModeEditOutline'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import ShareIcon from '@mui/icons-material/Share'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useBoardStore from '~/stores/useBoardStore'
import useCardModal from '~/stores/useCardModal'

const stylePlaceholder = {
    border: '2.5px dashed #673ab7',
    opacity: 0.5,
    borderRadius: '8px'
}

const Card = ({ hideMedia, card }) => {
    const changeCardStore = useCardModal((state) => state.change)
    const deleteCard = useBoardStore((state) => state.deleteCard)

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

    const handleDeleteCard = () => {
        const isConfirm = window.confirm('Do you want delete card?')
        if (isConfirm) {
            deleteCard(card)
        }
    }

    return hideMedia ? (
        <MuiCard
            sx={{
                overflow: 'unset',
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}
        >
            <CardContent>
                <Typography variant='body2' color='text.secondary'>
                    Hello
                </Typography>
            </CardContent>
            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size='small' sx={{ color: 'primary.text' }} startIcon={<PeopleOutlineIcon />}>
                    10
                </Button>
                <Button size='small' startIcon={<InsertCommentIcon />}>
                    15
                </Button>
                <Button size='small' startIcon={<ShareIcon />}>
                    20
                </Button>
            </CardActions>
        </MuiCard>
    ) : (
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
                    sx={{ borderRadius: '4px 4px 0 0', height: 'auto', aspectRatio: '16/9' }}
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
            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size='small' sx={{ color: 'primary.text' }} startIcon={<PeopleOutlineIcon />}>
                    {card?.memberIds?.length ?? 0}
                </Button>
                <Button size='small' sx={{ color: 'primary.text' }} startIcon={<InsertCommentIcon />}>
                    {card?.comments?.length ?? 0}
                </Button>
                <Tooltip title='Edit'>
                    <Button
                        onClick={() => changeCardStore({ isOpen: true, columnId: card.columnId, card: card })}
                        size='small'
                        sx={{ color: 'primary.text' }}
                        // startIcon={<ModeEditOutline />}
                    >
                        {/* Edit */}
                        <ModeEditOutline sx={{ width: '18px', height: '18px' }} />
                    </Button>
                </Tooltip>
                <Tooltip title='Delete'>
                    <Button onClick={() => handleDeleteCard()} size='small' sx={{ color: 'primary.text' }}>
                        <DeleteForeverOutlined sx={{ width: '18px', height: '18px' }} />
                    </Button>
                </Tooltip>
            </CardActions>
        </MuiCard>
    )
}

export default Card
