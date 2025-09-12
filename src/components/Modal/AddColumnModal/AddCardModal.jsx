import { Done } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button, Modal, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useState } from 'react'
import toast from 'react-hot-toast'
import boardApi from '~/apis/board.api'
import { BOARD_ID } from '~/pages/Boards/_id'
import useBoardStore from '~/stores/useBoardStore'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 1,
    boxShadow: 24,
    p: '12px 20px'
}

const AddCardModal = ({ isOpen, toggleOpen }) => {
    const [tittle, setTitle] = useState({ value: '', errMsg: '' })
    const [img, setImg] = useState('')
    const [isFetching, setFetching] = useState(false)

    const addCard = useBoardStore((state) => state.addCard)

    const addNewCard = async () => {
        if (!tittle.value) {
            setTitle({ value: '', errMsg: 'Column name is not blank' })
            return
        }

        setFetching(true)
        const column = { title: tittle.value, boardId: BOARD_ID }

        try {
            const res = await boardApi.addCard(column)
            toast.success(res?.data?.message)
            addCard(res?.data?.data)

            setTitle({ value: '', errMsg: '' })
            toggleOpen()
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            setFetching(false)
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={toggleOpen}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                    Add new Column
                </Typography>
                <TextField
                    label='Title column...'
                    type='text'
                    size='small'
                    autoFocus
                    value={tittle.value}
                    onChange={(e) => setTitle({ value: e.target.value, errMsg: '' })}
                    error={Boolean(tittle.errMsg)}
                    helperText={tittle.errMsg}
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
                    autoFocus
                    value={img}
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
                            '& fieldset': { borderColor: 'primary.text' },
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
                    {img ? (
                        <img
                            src={img}
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover'
                            }}
                            alt=''
                        />
                    ) : (
                        <Typography sx={{ color: 'gray', fontStyle: 'italic' }}>Image preview</Typography>
                    )}
                </Box>
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
                        onClick={() => addNewCard()}
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
