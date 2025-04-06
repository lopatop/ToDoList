import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { RootState } from "@/app/store.ts"

export type TasksPropsType = {
  [key: string]: DomainTask[]
}

export const getTasksTC = createAsyncThunk("tasks/getTasks", async (todolistId: string, thunkAPI) => {
  try {
    const res = await tasksApi.getTasks(todolistId)
    return {
      todolistId,
      tasks: res.data.items,
    }
  } catch {
    return thunkAPI.rejectWithValue(null)
  }
})

export const deleteTasksTC = createAsyncThunk(
  "tasks/removeTask",
  async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
    try {
      await tasksApi.deleteTask(payload)
      return payload
    } catch {
      return thunkAPI.rejectWithValue(null)
    }
  },
)
export const createTaskTC = createAsyncThunk(
  "tasks/createTasks",
  async (payload: { todolistId: string; title: string }, thunkAPI) => {
    try {
      const res = await tasksApi.createTasks(payload)
      return {
        todolistId: payload.todolistId,
        task: res.data.data.item,
      }
    } catch {
      return thunkAPI.rejectWithValue(null)
    }
  },
)
export const changeTaskStatusTC = createAsyncThunk(
  "tasks/changeTaskStatus",
  async (payload: { todolistId: string; status: TaskStatus; taskId: string }, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState
      const task = state.tasks[payload.todolistId].find((t) => t.id === payload.taskId)
      if (task) {
        const model: UpdateTaskModel = {
          title: task.title,
          description: task.description,
          status: payload.status,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
        }
        await tasksApi.changeTaskStatus({
          todolistId: payload.todolistId,
          taskId: payload.taskId,
          model,
        })
      }
      return payload
    } catch {
      return thunkApi.rejectWithValue(null)
    }
  },
)
export const changeTaskTitleTC = createAsyncThunk(
  "tasks/changeTitle",
  async (payload: { todolistId: string; newTitle: string; taskId: string }, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState
      const task = state.tasks[payload.todolistId].find((t) => t.id === payload.taskId)
      if (task) {
        const model: UpdateTaskModel = {
          title: payload.newTitle,
          description: task.description,
          status: task.status,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
        }
        await tasksApi.changeTaskTitle({
          todolistId: payload.todolistId,
          taskId: payload.taskId,
          model,
        })
      }
      return payload
    } catch {
      return thunkApi.rejectWithValue(null)
    }
  },
)

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksPropsType,
  reducers: (create) => ({
    removeTitleTaskAC: create.reducer<{
      todolistId: string
      newTitle: string
      taskId: string
    }>((state, action) => {
      const { todolistId, newTitle, taskId } = action.payload
      const task = state[todolistId].find((t) => t.id === taskId)
      if (task) {
        task.title = newTitle
      }
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(getTasksTC.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(deleteTasksTC.fulfilled, (state, action) => {
        const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
        if (index != -1) {
          state[action.payload.todolistId].splice(index, 1)
        }
      })
      .addCase(createTaskTC.fulfilled, (state, action) => {
        state[action.payload.todolistId].unshift(action.payload.task)
      })
      .addCase(changeTaskStatusTC.fulfilled, (state, action) => {
        const task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId)
        if (task) {
          task.status = action.payload.status
        }
      })
      .addCase(changeTaskTitleTC.fulfilled, (state, action) => {
        const task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId)
        if (task) {
          task.title = action.payload.newTitle
        }
      })
  },
})

export const tasksReducer = tasksSlice.reducer
