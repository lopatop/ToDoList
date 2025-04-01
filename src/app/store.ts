import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { tasksReducer } from "@/features/todolists/model/tasks-reducer.ts"
import { todolistsSlice } from "@/features/todolists/model/todolists-slice.ts"
import { appReducer } from "./app-slice.ts"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsSlice,
  theme: appReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
