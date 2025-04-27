import { test, expect } from "vitest"


import {
    appReducer,
    changeThemeModeAC,
    setAppErrorAC,
    setAppStatusAC,
    ThemeMode
} from "@/app/app-slice.ts";
import {RequestStatus} from "@/common/types";

type AppState = {
    themeMode: ThemeMode
    status: RequestStatus
    error: string | null
}

const initialState: AppState = {
    themeMode: "light",
    status: "idle",
    error: null,
}

    test("should change theme mode", () => {
        const action = changeThemeModeAC({ themeMode: "dark" })
        const newState = appReducer(initialState, action)

        expect(newState.themeMode).toBe("dark")
    })

    test("should set app status", () => {
        const action = setAppStatusAC({ status: "loading" })
        const newState = appReducer(initialState, action)

        expect(newState.status).toBe("loading")
    })

    test("should set app error", () => {
        const action = setAppErrorAC({ error: "Some error occurred" })
        const newState = appReducer(initialState, action)

        expect(newState.error).toBe("Some error occurred")
    })

