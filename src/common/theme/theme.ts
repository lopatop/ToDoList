import { createTheme } from "@mui/material"
import teal from "@mui/material/colors/teal"
import { ThemeMode } from "@/app/app-slice"

export const getTheme = (themeMode: ThemeMode) =>
  createTheme({
    palette: {
      mode: themeMode,
      primary: teal,
      secondary: {
        main: "#035363",
      },
    },
  })
