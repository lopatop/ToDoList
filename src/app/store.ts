import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { tasksReducer, tasksSlice } from "@/features/todolists/model/tasks-slice.ts"
import { todolistsReducer, todolistsSlice } from "@/features/todolists/model/todolists-slice.ts"
import { appReducer, appSlice } from "./app-slice.ts"

const rootReducer = combineReducers({
  [tasksSlice.name]: tasksReducer,
  [todolistsSlice.name]: todolistsReducer,
  [appSlice.name]: appReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
