import Done from '@mui/icons-material/Done'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import boardApi from '~/apis/board.api'
import { BOARD_ID } from '~/pages/Boards/_id'
import useBoardStore from '~/stores/useBoardStore'
import useCardModal from '~/stores/useCardModal'
import useColumnsAddCardStore from '~/stores/useColumnsAddCardStore'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#f0f0f0' : '#2a3543'),
    border: '1px solid gray',
    borderRadius: 2,
    boxShadow: 24,
    p: '12px 20px'
}

const AddCardModal = () => {
    const [tittle, setTitle] = useState({ value: '', errMsg: '' })
    const [image, setImg] = useState('')
    const [isFetching, setFetching] = useState(false)

    const { addCard, updateCard } = useBoardStore((state) => state)
    const changeColumnIds = useColumnsAddCardStore((state) => state.changeColumnIds)

    const {
        isOpen: isOpenModal,
        columnId,
        card: cardData,
        toggle: toggleOpen,
        change: changeCardModal
    } = useCardModal((state) => state)

    /**
     * If card contain id then handle update card
     * Otherwise add new card
     */
    const addOrUpdateCard = async () => {
        if (!tittle.value.trim()) {
            setTitle({ value: '', errMsg: 'Title is not blank' })
            return
        }
        setFetching(true)

        try {
            let res = null
            if (cardData?._id) {
                const card = {
                    _id: cardData._id,
                    title: tittle.value,
                    boardId: BOARD_ID,
                    columnId,
                    image: image
                }
                res = await boardApi.updateCard(card)

                // Update card in state
                updateCard(res?.data?.data)
            } else {
                const card = { title: tittle.value, boardId: BOARD_ID, columnId, image }
                res = await boardApi.addCard(card)

                // Add card in state
                addCard(res?.data?.data)
                changeColumnIds(columnId)
            }
            toast.success(res?.data?.message)

            setTitle({ value: '', errMsg: '' })
            setImg('')
            changeCardModal({ isOpen: false, columnId: null, card: null })
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            setFetching(false)
        }
    }

    useEffect(() => {
        setTitle({ value: cardData?.title ?? '', errMsg: '' })
        setImg(cardData?.image ?? '')
    }, [cardData])

    return (
        <Modal
            open={isOpenModal}
            onClose={isFetching ? null : toggleOpen}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                    {cardData?._id ? 'Update' : 'Add'} card
                </Typography>
                <TextField
                    label='Title'
                    type='text'
                    size='small'
                    autoFocus
                    value={tittle?.value}
                    onChange={(e) => setTitle({ value: e.target.value, errMsg: '' })}
                    error={Boolean(tittle?.errMsg)}
                    helperText={tittle?.errMsg}
                    sx={{
                        width: '100%',
                        marginTop: '16px',
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
                <TextField
                    label='Image link'
                    type='text'
                    size='small'
                    value={image}
                    onChange={(e) => setImg(e.target.value)}
                    // error={Boolean(newColName.errMsg)}
                    // helperText={newColName.errMsg}
                    sx={{
                        width: '100%',
                        marginTop: '16px',
                        marginLeft: { xs: '12px', sm: 0 },
                        borderColor: 'white',
                        '& label, input': { color: 'primary.text' },
                        '& label.Mui-focused': { color: 'primary.text' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'primary.text'
                            },
                            '&:hover fieldset': { borderColor: 'primary.text' },
                            '&.Mui-focused fieldset': { borderColor: 'primary.text' }
                        }
                    }}
                />
                <Box
                    sx={{
                        width: '100%',
                        minHeight: '160px',
                        mt: 4,
                        border: '1px dashed gray',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {image ? (
                        <img
                            src={image}
                            style={{
                                width: '100%',
                                height: 'auto',
                                aspectRatio: '16/9',
                                objectFit: 'cover'
                            }}
                            alt=''
                        />
                    ) : (
                        <Typography sx={{ color: 'gray', fontStyle: 'italic' }}>Image preview</Typography>
                    )}
                </Box>
                {/* Action buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'end', columnGap: 2, mt: 2 }}>
                    <Button
                        onClick={() => toggleOpen()}
                        sx={{
                            color: 'error.light',
                            borderColor: 'error.light',
                            '&:hover': { color: 'error.main', borderColor: 'error.main' }
                        }}
                        variant='outlined'
                        disabled={isFetching}
                    >
                        Cancel
                    </Button>
                    <LoadingButton
                        loading={isFetching}
                        loadingPosition='start'
                        startIcon={<Done />}
                        onClick={() => addOrUpdateCard()}
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': { opacity: 0.8, backgroundColor: 'primary.main' }
                        }}
                        variant='contained'
                    >
                        <span>OK</span>
                    </LoadingButton>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddCardModal
