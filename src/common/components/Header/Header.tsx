
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from "@/components /MenuButton.tsx";
import {Switch} from "@mui/material";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {getTheme} from "@/common/theme/theme.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";


export  function Header() {

    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)
    const changeModeHandler = () => {
        dispatch(changeThemeModeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <Box sx={{ flexGrow: 1, pb:'30px' }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <MenuButton background={theme.palette.primary.dark} >Login</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>LogOut</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
                    <Switch
                        color={'default'}
                        onChange={changeModeHandler}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}