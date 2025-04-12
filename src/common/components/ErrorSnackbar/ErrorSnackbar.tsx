import { Alert, Snackbar } from "@mui/material"
import { SyntheticEvent } from "react"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { selectError, setAppErrorAC } from "@/app/app-slice.ts"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectError)

  const dispatch = useAppDispatch()
  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setAppErrorAC({ error: null }))
  }
  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity="error" variant="filled">
        {error}
      </Alert>
    </Snackbar>
  )
}
