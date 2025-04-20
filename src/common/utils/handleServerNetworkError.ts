import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice.ts"
import { Dispatch } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { ZodError } from "zod"

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage
  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error.message
  } else if (error instanceof AxiosError) {
    errorMessage = error.message
  } else if (error instanceof ZodError) {
    console.table(error.issues)
    errorMessage = "Zod error. Смотри консоль"
  } else {
    errorMessage = JSON.stringify(error)
  }
  dispatch(setAppErrorAC({ error: errorMessage }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
