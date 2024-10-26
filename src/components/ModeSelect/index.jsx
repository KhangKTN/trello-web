import { useColorScheme } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import DarkMode from '@mui/icons-material/DarkMode'
import LightMode from '@mui/icons-material/LightModeOutlined'
import SettingsBrightness from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'

function ModeSelect() {
    const { mode, setMode } = useColorScheme()

    const handleChange = (event) => {
        setMode(event.target.value)
    }

    return (
        <FormControl sx={{ minWidth: 120, display: { xs: 'none', sm: 'block' } }} size="small">
            <InputLabel
                sx={{
                    color: 'white',
                    '&.Mui-focused': { color: 'white' }
                }}
                id="label-select-theme-mode"
            >Theme
            </InputLabel>
            <Select
                labelId="label-select-theme-mode"
                id="select-theme-mode"
                value={mode}
                label="Theme"
                onChange={handleChange}
                sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '.MuiSvgIcon-root': { color: 'white' }
                }}
            >
                <MenuItem value='light'>
                    <div style={{ display: 'flex', alignItems: 'center', columnGap: '8px' }}>
                        <LightMode/>
                        Light
                    </div>
                </MenuItem>
                <MenuItem value='dark'>
                    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                        <DarkMode/>
                        Dark
                    </Box>
                </MenuItem>
                <MenuItem value='system'>
                    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                        <SettingsBrightness/>
                        System
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    )
}

export default ModeSelect