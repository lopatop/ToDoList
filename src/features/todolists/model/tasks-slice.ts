import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice"
import { tasksApi } from "@/features/todolists/api/tasksApi"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"
import { createAppSlice } from "@/common/utils"
import { setAppStatusAC } from "@/app/app-slice"
import { ResultCode } from "@/common/enums/enums.ts"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError.ts"
import { handleServerAppError } from "@/common/utils/handleServerAppError.ts"

export type TasksPropsType = {
  [key: string]: DomainTask[]
}

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksPropsType,
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.getTasks(todolistId)
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return { tasks: res.data.items, todolistId }
        } catch {
          dispatch(setAppStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    deleteTasksTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.deleteTask(payload)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return res.data
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
          const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
          if (index !== -1) {
            state[action.payload.todolistId].splice(index, 1)
          }
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.createTasks(payload)
          if (res.data.resultCode === ResultCode.Success) {
            return {
              task: res.data.data.item,
              todolistId: payload.todolistId,
            }
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
          state[action.payload.todolistId].unshift({ ...action.payload.task })
        },
      },
    ),
    updateTaskTC: create.asyncThunk(
      async (
        payload: {
          todolistId: string
          taskId: string
          domainModel: Partial<UpdateTaskModel>
        },
        { dispatch, rejectWithValue },
      ) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.updateTask({
            todolistId: payload.todolistId,
            taskId: payload.taskId,
            domainModel: payload.domainModel,
          })
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { task: res.data.data.item }
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
          const tasks = state[action.payload.task.todoListId]
          const index = tasks.findIndex((t) => t.id === action.payload.task.id)
          if (index !== -1) {
            tasks[index] = action.payload.task
          }
        },
      },
    ),
  }),

  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const { updateTaskTC, createTaskTC, deleteTasksTC, fetchTasksTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
