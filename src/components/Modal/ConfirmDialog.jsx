import { Done } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import * as React from 'react'
import useConfirmDialogStore from '~/stores/useConfirmDialogStore'

const DialogConfirm = () => {
    const { isOpen, title, content, toggle, action } = useConfirmDialogStore((state) => state)

    const [isLoading, setLoading] = React.useState(false)

    const handleConfirm = async () => {
        setLoading(true)
        await action()
        toggle()
        setLoading(false)
    }

    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={toggle}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            mr: 1,
                            color: 'primary.text',
                            borderColor: 'gray',
                            '&:hover': {
                                opacity: 0.6,
                                borderColor: 'primary.main'
                            }
                        }}
                        onClick={toggle}
                        variant='outlined'
                        disabled={isLoading}
                    >
                        No
                    </Button>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition='start'
                        startIcon={<Done />}
                        onClick={handleConfirm}
                        sx={{
                            backgroundImage: 'linear-gradient(to right, #ba4143ff 0%, #c02c3dff  51%, #e2383bff  100%)',
                            transition: '0.5s',
                            backgroundSize: '200% auto',
                            '&:hover': { opacity: 0.8, backgroundPosition: 'right center' }
                        }}
                        variant='contained'
                    >
                        <span>OK</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default DialogConfirm
