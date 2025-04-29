import s from"./App.module.css"
import { Header } from "@/common/components"
import CssBaseline from "@mui/material/CssBaseline"
import {CircularProgress, ThemeProvider} from "@mui/material"
import { useSelector } from "react-redux"
import { getTheme } from "@/common/theme"
import { selectThemeMode } from "@/app/app-slice"
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar.tsx"
import { Routing } from "@/common/routing/Routing.tsx"
import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {useEffect, useState} from "react";
import {meTC} from "@/features/auth/model/auth-slice.ts";
import {selectTasks, selectTodolists} from "@/features/todolists/model";

function App() {
  const [isInitialized, setIsInitialized] = useState(false)


  const themeMode = useSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

    const tasks = useAppSelector(selectTasks)
    const todolists = useAppSelector(selectTodolists)

    useEffect(() => {
        console.log(' таски: ', tasks)
        console.log(' тудушки: ', todolists)
    }, [tasks,todolists]);


  useEffect(() => {
    dispatch(meTC()).finally(()=>{setIsInitialized(true)})
  }, []);

  if (!isInitialized) {
    return (
        <ThemeProvider theme={theme}>
        <div className={s.circularProgressContainer}>
          <CircularProgress size={150} thickness={3} />
        </div>
        </ThemeProvider>
    )
  }




  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}

export default App
