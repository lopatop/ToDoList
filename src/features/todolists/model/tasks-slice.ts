import { createSlice, nanoid } from "@reduxjs/toolkit"

import { TaskType } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { TaskStatus } from "@/common/enums/enums.ts"
import { createTodolistAC, deleteTodolistAC } from "@/features/todolists/model/todolists-slice.ts"

export type TasksPropsType = {
  [key: string]: TaskType[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksPropsType,
  reducers: (create) => ({
    removeTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex((s) => s.id === action.payload.taskId)
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1)
      }
    }),
    addTaskAC: create.preparedReducer(
      (todolistId: string, titleTasks: string) => ({
        payload: { todolistId, titleTasks, taskId: nanoid() },
      }),
      (state, action) => {
        state[action.payload.todolistId].push({
          id: action.payload.taskId,
          title: action.payload.titleTasks,
          isDone: TaskStatus.New,
        })
      },
    ),
    changeIsDoneTaskAC: create.reducer<{ todolistId: string; isDone: TaskStatus; taskId: string }>((state, action) => {
      const { todolistId, isDone, taskId } = action.payload
      const task = state[todolistId].find((t) => t.id === taskId)
      if (task) {
        task.isDone = isDone
      }
    }),
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
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.todolistId] = []
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.todolistId]
      })
  },
})

export const { removeTaskAC, addTaskAC, changeIsDoneTaskAC, removeTitleTaskAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
