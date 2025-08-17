import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import AddchartIcon from '@mui/icons-material/Addchart'
import { Button, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Column from './Column/Column'

const ListColumn = ({ columns }) => {
    const [isShowFormCol, setShowFormCol] = useState(false)
    const [newColName, setNewColName] = useState({ value: '', errMsg: '' })

    const toggleShowFormCol = () => {
        setShowFormCol(!isShowFormCol)
    }

    const addNewCol = () => {
        if (!newColName.value) {
            setNewColName({ value: '', errMsg: 'Column name is not blank' })
            return
        }
        setNewColName({ value: '', errMsg: '' })
        setShowFormCol(false)
        toast.success('Add new Column success!')
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
                {isShowFormCol ? (
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
                            value={newColName.value}
                            onChange={(e) => setNewColName({ value: e.target.value, errMsg: '' })}
                            error={Boolean(newColName.errMsg)}
                            helperText={newColName.errMsg}
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
                                onClick={() => toggleShowFormCol()}
                                sx={{
                                    color: 'error.light',
                                    borderColor: 'error.light',
                                    '&:hover': { color: 'error.main', borderColor: 'error.main' }
                                }}
                                variant='outlined'
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => addNewCol()}
                                sx={{
                                    backgroundColor: 'primary.main',
                                    '&:hover': { opacity: 0.8, backgroundColor: 'primary.main' }
                                }}
                                variant='contained'
                            >
                                OK
                            </Button>
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
                            onClick={() => toggleShowFormCol()}
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
