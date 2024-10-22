import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { teal, deepOrange, deepPurple, orange } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
    appLayout: {
        appBarHeight: '48px',
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
                    main: deepPurple['A200']
                },
                secondary: orange
            }
        }
    }
})

export default theme