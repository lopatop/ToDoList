
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from "./MenuButton.tsx";
import {Switch, useTheme} from "@mui/material";


type ButtonAppBarPropsType = {
    onChange:()=>void
}

export  function ButtonAppBar(props:ButtonAppBarPropsType) {
    const{onChange}=props
    const theme = useTheme()
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
                        onChange={onChange}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}