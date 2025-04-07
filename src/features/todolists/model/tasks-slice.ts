import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { RootState } from "@/app/store.ts"
import { createAppSlice } from "@/common/utils"

export type TasksPropsType = {
  [key: string]: DomainTask[]
}

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksPropsType,
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          const res = await tasksApi.getTasks(todolistId)
          return { tasks: res.data.items, todolistId }
        } catch {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    deleteTasksTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
        try {
          await tasksApi.deleteTask(payload)
          return payload
        } catch {
          return thunkAPI.rejectWithValue(null)
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
      async (payload: { todolistId: string; title: string }, thunkAPI) => {
        try {
          const res = await tasksApi.createTasks(payload)
          return {
            task: res.data.data.item,
            todolistId: payload.todolistId,
          }
        } catch {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId].unshift({ ...action.payload.task })
        },
      },
    ),
    changeTaskStatusTC: create.asyncThunk(
      async (payload: { todolistId: string; status: TaskStatus; task: DomainTask }, thunkAPI) => {
        try {
          const model: UpdateTaskModel = {
            ...payload.task,
            status: payload.status,
          }

          const res = await tasksApi.changeTaskStatus({
            todolistId: payload.todolistId,
            taskId: payload.task.id,
            model,
          })
          return { task: res.data.data.item }
        } catch {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
          if (task) {
            task.status = action.payload.task.status
          }
        },
      },
    ),
    changeTaskTitleTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string; taskId: string }, thunkAPI) => {
        try {
          const state = thunkAPI.getState() as RootState
          const task = state.tasks[payload.todolistId].find((t) => t.id === payload.taskId)
          if (!task) {
            return thunkAPI.rejectWithValue(null)
          }
          const model: UpdateTaskModel = {
            title: payload.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
          }

          const res = await tasksApi.changeTaskTitle({
            todolistId: payload.todolistId,
            taskId: payload.taskId,
            model,
          })
          return { task: res.data.data.item }
        } catch {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
          if (task) {
            task.title = action.payload.task.title
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

export const { changeTaskTitleTC, changeTaskStatusTC, createTaskTC, deleteTasksTC, fetchTasksTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
