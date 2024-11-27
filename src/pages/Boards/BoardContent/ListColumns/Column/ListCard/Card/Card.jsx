import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import InsertCommentIcon from '@mui/icons-material/InsertComment'
import ShareIcon from '@mui/icons-material/Share'
import { Card as MuiCard } from '@mui/material'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const stylePlaceholder = {
    border: '2.5px dashed green',
    opacity: .5,
    borderRadius: '8px'
}

const Card = ({ hideMedia, card }) => {
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
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}
        >
            {card.cover && (
                <CardMedia
                    component='img'
                    alt='card-img'
                    height='140'
                    image='https://media.bongda.com.vn/editor-upload/2024-7-22/phan_nguyen_hoai_thu/thumb_133455_default_news_size_5.jpeg'
                />
            )}
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
                    {card.memberIds.length}
                </Button>
                <Button size='small' sx={{ color: 'primary.text' }} startIcon={<InsertCommentIcon />}>
                    {card.comments.length}
                </Button>
                <Button size='small' sx={{ color: 'primary.text' }} startIcon={<ShareIcon />}>
                    {card.attachments.length}
                </Button>
            </CardActions>
        </MuiCard>
    )
}

export default Card