import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { teal, deepOrange, indigo, orange } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
    appLayout: {
        appBarHeight: '56px',
        boardBarHeight: '60px'
    },
    colorSchemes: {
        light: {
            palette: {
                primary: teal,
                secondary: deepOrange
            }
        },
        dark: {
            palette: {
                primary: {
                    main: indigo['A100']
                },
                secondary: orange
            }
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '6px',
                        height: '6px'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        background: 'gray',
                        borderRadius: '8px',
                        backdropFilter: 'blur(8px)'
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        background: 'linear-gradient(to right, #FED9ED, #E7BCDE)',
                        borderRadius: '8px',
                        backdropFilter: 'blur(8px)'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => ({ color: theme.palette.primary.main })
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    '.MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.light },
                    '&:hover': {
                        '.MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main }
                    },
                    '& fieldset': { borderWidth: '1px !important' }
                })
            }
        }
    }
})

export default theme