import {onClickFilterHandlerType} from "../components /Todolist.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export type TodolistPropsType = {
    id: string
    title: string
    filter: onClickFilterHandlerType
}

const initialState: TodolistPropsType[] = [];

export const deleteTodolistAC = createAction<{todolistId:string}>('todolists/deleteTodolist')

export const changeFilterAC = createAction<{todolistId:string, filter: onClickFilterHandlerType}>('todolists/changeFilter')

export const createTodolistAC = createAction('todolists/createTodolist',(title:string)=>{
    return {payload:{title, todolistId:nanoid()}}
})

export const changeTodolistTitleAC = createAction<{todolistId: string, newTitle: string}>('todolists/changeTodolistTitle')


export const todolistsReducer = createReducer(initialState, builder => {
    builder.addCase(deleteTodolistAC, (state, action) => {
        const index = state.findIndex(todolist=>todolist.id === action.payload.todolistId)
        if (index !== -1) {
            state.splice(index, 1)
        }
    })
    builder.addCase(changeFilterAC, (state, action) => {
       const todolist = state.find(todolist=>todolist.id === action.payload.todolistId)
        if (todolist) {
            todolist.filter = action.payload.filter
        }
    })
    builder.addCase(createTodolistAC, (state, action) => {
        state.push({ id: action.payload.todolistId, title: action.payload.title, filter:'all' })
    })
    builder.addCase(changeTodolistTitleAC, (state, action) => {
        const todolist = state.find(todolist=> todolist.id === action.payload.todolistId)
        if (todolist) {
            todolist.title = action.payload.newTitle
        }
    })
})


