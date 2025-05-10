import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import {MenuButton} from "@/common/components/MenuButton/MenuButton"
import {LinearProgress, Switch} from "@mui/material"
import {changeThemeModeAC, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedInAC} from "@/app/app-slice"
import {getTheme} from "@/common/theme/theme"
import {useAppDispatch} from "@/common/hooks/useAppDispatch"
import {useAppSelector} from "@/common/hooks/useAppSelector"
import {useNavigate} from "react-router";
import {Path} from "@/common/routing/Routing.tsx";
import {AUTH_TOKEN} from "@/common/constant";
import {useLogoutMutation} from "@/features/auth/api/authApi.ts";
import {ResultCode} from "@/common/enums";
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";

export function Header() {
    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)
    const changeModeHandler = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === "light" ? "dark" : "light"}))
    }
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const status = useAppSelector(selectStatus)
    const navigate = useNavigate();
    const [logout] = useLogoutMutation()


    const onClickLogOutHandler = () => {
        logout().then((res) => {
            if (res.data?.resultCode === ResultCode.Success) {
                dispatch(setIsLoggedInAC({isLoggedIn: false}))
                localStorage.removeItem(AUTH_TOKEN)
            }
        }).then(()=>{
            dispatch(todolistsApi.util.invalidateTags(["Todolist", "Task"]))
           // location.reload() тоже самое что и F5
        })
    }


    const onClickFaqHandler = () => {
        navigate(Path.Faq)
    }


    return (
        <Box sx={{flexGrow: 1, pb: "30px"}}>
            <AppBar position="static" style={{width:'100vw'}}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu"
                                sx={{mr: 2}}><MenuIcon/></IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>News</Typography>
                    {isLoggedIn && <MenuButton background={theme.palette.primary.dark}
                                               onClick={onClickLogOutHandler}>LogOut</MenuButton>}
                    {isLoggedIn && <MenuButton background={theme.palette.primary.dark}
                                               onClick={onClickFaqHandler}>FAQ</MenuButton>}
                    <Switch color={"default"} onChange={changeModeHandler}/>
                </Toolbar>
                {status === "loading" && <LinearProgress/>}
            </AppBar>
        </Box>
    )
}
