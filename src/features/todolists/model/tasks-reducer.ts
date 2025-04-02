import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"
import { createTodolistAC, deleteTodolistAC } from "./todolists-slice.ts"
import { TaskType } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"

export type TasksPropsType = {
  [key: string]: TaskType[]
}

//
// type RemoveTaskActionType ={
//     type: 'REMOVE-TASK'
//     payload:{
//         todolistId:string
//         taskId:string
//     }
// }
//
// type AddTasksActionType ={
//     type: 'ADD-TASK'
//     payload:{
//         todolistId:string
//         titleTasks:string
//     }
// }
// type ChangeIsDoneTaskActionType ={
//     type: 'CHANGE-ISDONE-TASK',
//     payload:{
//         todolistId:string
//         isDone:boolean
//         taskId:string
//     }
// }
// type RemoveTitleTaskActionType ={
//     type: 'REMOVE-TITLE-TASK',
//     payload:{
//         todolistId:string,
//         newTitle:string,
//         taskId:string
//     }
// }
// type AddTaskTodolistActionType ={
//     type: 'ADD-TASK-TODOLIST'
//     payload:{
//         todolistId:string,
//     }
// }
//
// type ActionType = RemoveTaskActionType | AddTasksActionType | ChangeIsDoneTaskActionType | RemoveTitleTaskActionType | AddTaskTodolistActionType

export const removeTaskAC = createAction<{ todolistId: string; taskId: string }>("tasks/removeTask")

export const addTaskAC = createAction<{ todolistId: string; titleTasks: string }>("tasks/addTask")

export const changeIsDoneTaskAC = createAction<{
  todolistId: string
  isDone: boolean
  taskId: string
}>("tasks/changeIsDoneTask")

export const removeTitleTaskAC = createAction<{
  todolistId: string
  newTitle: string
  taskId: string
}>("tasks/removeTitleTask")

export const addTaskTodolistAC = createAction<{ todolistId: string }>("tasks/addTaskTodolistAC")

const initialState: TasksPropsType = {}

export const tasksReducer = createReducer(initialState, (builder) => {
  builder.addCase(deleteTodolistAC, (state, action) => {
    delete state[action.payload.todolistId]
  })

  builder.addCase(removeTaskAC, (state, action) => {
    const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
    if (index !== -1) {
      state[action.payload.todolistId].splice(index, 1)
    }
  })
  builder.addCase(addTaskAC, (state, action) => {
    state[action.payload.todolistId].push({ id: nanoid(), title: action.payload.titleTasks, isDone: false })
  })
  builder.addCase(changeIsDoneTaskAC, (state, action) => {
    const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
    if (index !== -1) {
      state[action.payload.todolistId][index].isDone = action.payload.isDone
    }
  })
  builder.addCase(removeTitleTaskAC, (state, action) => {
    const task = state[action.payload.todolistId].find((todolist) => todolist.id === action.payload.taskId)
    if (task) {
      task.title = action.payload.newTitle
    }
  })
  builder.addCase(addTaskTodolistAC, (state, action) => {
    state[action.payload.todolistId] = []
  })
  builder.addCase(createTodolistAC, (state, action) => {
    state[action.payload.todolistId] = []
  })
})
