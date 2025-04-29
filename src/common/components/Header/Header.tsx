import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { MenuButton } from "@/common/components/MenuButton/MenuButton"
import { LinearProgress, Switch } from "@mui/material"
import { changeThemeModeAC, selectStatus, selectThemeMode } from "@/app/app-slice"
import { getTheme } from "@/common/theme/theme"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import {logoutTC, selectIsLoggedIn} from "@/features/auth/model/auth-slice.ts";
import {useNavigate} from "react-router";
import {Path} from "@/common/routing/Routing.tsx";

export function Header() {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  const theme = getTheme(themeMode)
  const changeModeHandler = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const status = useAppSelector(selectStatus)
  const navigate = useNavigate();
  

  const onClickLogOutHandler = ()=>{
    dispatch(logoutTC())
  }

  const onClickFaqHandler =()=>{
    navigate(Path.Faq)
  }


  return (
    <Box sx={{ flexGrow: 1, pb: "30px" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}><MenuIcon /></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>News</Typography>
          {isLoggedIn && <MenuButton background={theme.palette.primary.dark} onClick={onClickLogOutHandler}>LogOut</MenuButton> }
          {isLoggedIn &&  <MenuButton background={theme.palette.primary.dark} onClick={onClickFaqHandler} >FAQ</MenuButton> }
          <Switch color={"default"} onChange={changeModeHandler} />
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
    </Box>
  )
}
