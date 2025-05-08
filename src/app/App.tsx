import s from "./App.module.css"
import {Header} from "@/common/components"
import CssBaseline from "@mui/material/CssBaseline"
import {CircularProgress, ThemeProvider} from "@mui/material"
import {useSelector} from "react-redux"
import {getTheme} from "@/common/theme"
import {selectThemeMode, setIsLoggedInAC} from "@/app/app-slice"
import {ErrorSnackbar} from "@/common/components/ErrorSnackbar/ErrorSnackbar.tsx"
import {Routing} from "@/common/routing/Routing.tsx"
import {useAppDispatch} from "@/common/hooks";
import {useEffect, useState} from "react";
import {useMeQuery} from "@/features/auth/api/authApi.ts";
import {ResultCode} from "@/common/enums";

function App() {
    const [isInitialized, setIsInitialized] = useState(false)

    const {data, isLoading} = useMeQuery()


    const themeMode = useSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if(isLoading) return
        setIsInitialized(true)
        if(data?.resultCode === ResultCode.Success){
            dispatch(setIsLoggedInAC({isLoggedIn: true}))
        }
    }, [isLoading]);

    if (!isInitialized) {
        return (
            <ThemeProvider theme={theme}>
                <div className={s.circularProgressContainer}>
                    <CircularProgress size={150} thickness={3}/>
                </div>
            </ThemeProvider>
        )
    }


    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <CssBaseline/>
                <Header/>
                <Routing/>
                <ErrorSnackbar/>
            </div>
        </ThemeProvider>
    )
}

export default App
