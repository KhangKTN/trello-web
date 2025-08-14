import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import AddchartIcon from '@mui/icons-material/Addchart'
import { Button, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { useState } from 'react'
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
                            bgcolor: 'primary.main',
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
                                '& label, input': { color: 'white' },
                                '& label.Mui-focused': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' }
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
                                    backgroundColor: 'green',
                                    '&:hover': { opacity: 0.8, backgroundColor: 'green' }
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
                            bgcolor: 'primary.main',
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
