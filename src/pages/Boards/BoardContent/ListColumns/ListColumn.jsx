import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import AddchartIcon from '@mui/icons-material/Addchart'
import Done from '@mui/icons-material/Done'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import toast from 'react-hot-toast'
import boardApi from '~/apis/board.api'
import useBoardStore from '~/stores/useBoardStore'
import { BOARD_ID } from '../../_id'
import Column from './Column/Column'

const ListColumn = ({ columns }) => {
    const [tittle, setTitle] = useState({ value: '', errMsg: '' })
    const [isShowForm, setShowForm] = useState(false)
    const [isFetching, setFetching] = useState(false)

    const addColumn = useBoardStore((state) => state.addColumn)

    const toggleShowForm = () => {
        setShowForm(!isShowForm)
    }

    const addNewColumn = async () => {
        if (!tittle.value) {
            setTitle({ value: '', errMsg: 'Column name is not blank' })
            return
        }

        setFetching(true)
        const column = { title: tittle.value, boardId: BOARD_ID }

        try {
            const res = await boardApi.addColumn(column)
            toast.success(res?.data?.message)
            addColumn(res?.data?.data)

            setTitle({ value: '', errMsg: '' })
            toggleShowForm()
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            setFetching(false)
        }
    }

    return (
        <SortableContext items={columns?.map((col) => col._id)} strategy={horizontalListSortingStrategy}>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    width: '100%',
                    height: '100%',
                    px: '12px'
                }}
            >
                {columns?.map((column) => (
                    <Column key={column?._id} column={column} />
                ))}
                {/* Button Add new column */}
                {isShowForm ? (
                    <Box
                        sx={{
                            minWidth: '250px',
                            maxWidth: '250px',
                            height: 'fit-content',
                            mx: 2,
                            p: 1.5,
                            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'white' : '#2a3543'),
                            borderRadius: '8px'
                        }}
                    >
                        <TextField
                            id='outlined-search'
                            label='Enter name column...'
                            type='text'
                            size='small'
                            autoFocus
                            value={tittle.value}
                            onChange={(e) => setTitle({ value: e.target.value, errMsg: '' })}
                            error={Boolean(tittle.errMsg)}
                            helperText={tittle.errMsg}
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
                        <Box sx={{ display: 'flex', justifyContent: 'end', columnGap: 2, mt: 2 }}>
                            <Button
                                onClick={() => toggleShowForm()}
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
                                onClick={() => addNewColumn()}
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
                ) : (
                    <Box
                        sx={{
                            minWidth: '200px',
                            maxWidth: '200px',
                            height: 'fit-content',
                            mx: 2,
                            backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : '#2a3543'),
                            borderRadius: '8px',
                            overflow: 'hidden'
                        }}
                    >
                        <Button
                            onClick={() => toggleShowForm()}
                            sx={{ color: 'white', width: '100%', py: 1 }}
                            startIcon={<AddchartIcon />}
                        >
                            Add new column
                        </Button>
                    </Box>
                )}
            </Box>
        </SortableContext>
    )
}

export default ListColumn
