import { expect, test } from "vitest"

import {
  changeFilterAC,
  changeTodolistTitleTC,
  deleteTodolistTC,
  DomainTodolist,
  todolistsSlice,
} from "../todolists-slice"
import { nanoid } from "@reduxjs/toolkit"

test("correct todolist should be deleted", () => {
  const todolistId1 = nanoid()
  const todolistId2 = nanoid()

  const startState: DomainTodolist[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]

  const action = deleteTodolistTC({ todolistId: todolistId1 })
  const endState = todolistsSlice(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be filter", () => {
  const todolistId1 = nanoid()
  const todolistId2 = nanoid()

  const startState: DomainTodolist[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]

  const action = changeFilterAC({ todolistId: todolistId1, filter: "active" })
  const endState = todolistsSlice(startState, action)

  expect(endState[0].filter).toBe("active")
  expect(endState[1].filter).toBe("all")
})

test("correct todolist should be created", () => {
  const todolistId1 = nanoid()
  const todolistId2 = nanoid()

  const startState: DomainTodolist[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]

  const title = "New todolist"
  const endState = todolistsSlice(startState, createTodolistAC(title))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(title)
})

test("correct todolist should change its title", () => {
  const todolistId1 = nanoid()
  const todolistId2 = nanoid()

  const startState: DomainTodolist[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]

  const title = "New title"
  const endState = todolistsSlice(startState, changeTodolistTitleTC({ todolistId: todolistId2, newTitle: title }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(title)
})
