import "./App.css"
import { Header } from "@/common/components"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material"
import { useSelector } from "react-redux"
import { getTheme } from "@/common/theme"
import { Main } from "@/app/Main.tsx"
import { selectThemeMode } from "@/app/app-slice.ts"

function App() {
  const themeMode = useSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}

export default App
