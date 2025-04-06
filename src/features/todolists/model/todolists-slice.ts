import { Todolist } from "@/features/todolists/api"
import { todolistsApi } from "@/features/todolists/api"
import { onClickFilterHandlerType } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getTasksTC } from "../model/tasks-slice"

export type DomainTodolist = Todolist & {
  filter: onClickFilterHandlerType
}

export const fetchTodolistsTC = createAsyncThunk("todolists/fetchTodolistsTC", async (_state, thunkAPI) => {
  try {
    const res = await todolistsApi.getTodolists()
    const todolists = res.data
    todolists.map((t) => thunkAPI.dispatch(getTasksTC(t.id)))
    return { todolists }
  } catch (error) {
    return thunkAPI.rejectWithValue(null)
  }
})

export const changeTodolistTitleTC = createAsyncThunk(
  "todolists/changeTodolistTitle",
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistsTitle(payload)
      return payload
    } catch (error) {
      return thunkAPI.rejectWithValue(null)
    }
  },
)
export const deleteTodolistTC = createAsyncThunk(
  "todolists/deleteTodolist",
  async (payload: { id: string }, thunkAPI) => {
    try {
      await todolistsApi.deleteTodolist(payload)
      return payload
    } catch {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const createTodolistTC = createAsyncThunk(
  "todolists/createTodolist",
  async (payload: { title: string }, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodolist(payload)
      return res.data.data.item
    } catch {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        action.payload?.todolists.forEach((t) => {
          state.push({ ...t, filter: "all" })
        })
      })
      .addCase(fetchTodolistsTC.rejected, (_state, action) => {
        console.log(action.error.message)
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((s) => s.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((s) => s.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.unshift({ ...action.payload, filter: "all" })
      })
  },
  reducers: (create) => ({
    changeFilterAC: create.reducer<{ todolistId: string; filter: onClickFilterHandlerType }>((state, action) => {
      const todolist = state.find((t) => t.id === action.payload.todolistId)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
  }),
})

export const { changeFilterAC } = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
