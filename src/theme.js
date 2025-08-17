import { deepPurple } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '60px'
const BOARD_BAR_HEIGHT = '56px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - (${APP_BAR_HEIGHT} + ${BOARD_BAR_HEIGHT}))`
const COLUMN_HEADER_HEIGHT = '48px'
const COLUMN_FOOTER_HEIGHT = '60px'

// Create a theme instance.
const theme = extendTheme({
    appLayout: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: deepPurple['500'],
                    text: 'dark'
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: deepPurple['500'],
                    text: 'white'
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
                    borderWidth: '1px',
                    '&:hover': {
                        borderWidth: '1px',
                        borderColor: 'white',
                        opacity: 0.8
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
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    '&.MuiTypography-body1': { fontSize: '0.875rem' }
                }
            }
        }
    }
})

export default theme
