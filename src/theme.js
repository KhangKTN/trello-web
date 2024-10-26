import { indigo } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
    appLayout: {
        appBarHeight: '56px',
        boardBarHeight: '60px'
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: indigo['A200']
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: '#2a3543'
                }
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
                root: {
                    textTransform: 'none',
                    borderWidth: '.5px',
                    '&:hover': {
                        borderWidth: '1px',
                        borderColor: 'white'
                    }
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
                root: {
                    // color: theme.palette.primary.main,
                    // '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    // '&:hover': {
                    //     '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
                    // },
                    '& fieldset': { borderWidth: '1px !important' },
                    '&:hover fieldset': { borderWidth: '1.5px !important' },
                    '&.Mui-focused fieldset': { borderWidth: '1.5px !important' }
                }
            }
        }
    }
})

export default theme