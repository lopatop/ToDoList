import { Todolist } from "@/features/todolists/api"
import { todolistsApi } from "@/features/todolists/api"
import { onClickFilterHandlerType } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem"
import { createAppSlice } from "@/common/utils"
import { setAppStatusAC } from "@/app/app-slice"
import { RequestStatus } from "@/common/types"
import { ResultCode } from "@/common/enums/enums.ts"
import { handleServerAppError } from "@/common/utils/handleServerAppError.ts"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError.ts"

export type DomainTodolist = Todolist & {
  filter: onClickFilterHandlerType
  entityStatus: RequestStatus
}

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    fetchTodolistsTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistsApi.getTodolists()
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return { todolists: res.data }
        } catch {
          dispatch(setAppStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.map((t) => state.push({ ...t, filter: "all", entityStatus: "failed" }))
        },
      },
    ),
    changeTodolistTitleTC: create.asyncThunk(
      async (payload: { id: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistsApi.changeTodolistsTitle(payload)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return payload
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error: unknown) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const todolist = state.find((t) => t.id === action.payload.id)
          if (todolist) {
            todolist.title = action.payload.title
          }
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (payload: { id: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          dispatch(changeTodolistStatusAC({ todolistId: payload.id, entityStatus: "loading" }))
          const res = await todolistsApi.deleteTodolist(payload)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return payload
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error: unknown) {
          dispatch(changeTodolistStatusAC({ todolistId: payload.id, entityStatus: "failed" }))
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((s) => s.id === action.payload.id)
          if (index !== -1) {
            state.splice(index, 1)
          }
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async (payload: { title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistsApi.createTodolist(payload)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return res.data.data.item
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error: unknown) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload, filter: "all", entityStatus: "failed" })
        },
      },
    ),

    changeFilterAC: create.reducer<{ todolistId: string; filter: onClickFilterHandlerType }>((state, action) => {
      const todolist = state.find((t) => t.id === action.payload.todolistId)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    changeTodolistStatusAC: create.reducer<{ todolistId: string; entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find((t) => t.id === action.payload.todolistId)
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus
      }
    }),
  }),
})

export const {
  createTodolistTC,
  deleteTodolistTC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  changeFilterAC,
  changeTodolistStatusAC,
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
