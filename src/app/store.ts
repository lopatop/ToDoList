import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { tasksReducer, tasksSlice } from "@/features/todolists/model/tasks-slice"
import { todolistsReducer, todolistsSlice } from "@/features/todolists/model/todolists-slice"
import { appReducer, appSlice } from "./app-slice"
import {authReducer, authSlice} from "@/features/auth/model/auth-slice.ts";

const rootReducer = combineReducers({
  [tasksSlice.name]: tasksReducer,
  [todolistsSlice.name]: todolistsReducer,
  [appSlice.name]: appReducer,
  [authSlice.name]: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
