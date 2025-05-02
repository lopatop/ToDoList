import { nanoid } from "@reduxjs/toolkit"
import { beforeEach, expect, test } from "vitest"
import {
  changeFilterAC, changeTodolistStatusAC,
  changeTodolistTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  type DomainTodolist,
  todolistsReducer,
} from "../todolists-slice"
import {RequestStatus} from "@/common/types";

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    { id: todolistId1, title: "What to learn", addedDate: "", order: 0, filter: "all", entityStatus: "idle" },
    { id: todolistId2, title: "What to buy", addedDate: "", order: 0, filter: "all", entityStatus: "idle" },
  ]
})

test("correct todolist should be deleted", () => {
  //удаление тудулиста
  const endState = todolistsReducer(
    startState,
    deleteTodolistTC.fulfilled({ id: todolistId1 }, "requestId", { id: todolistId1 }),
  )

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be created", () => {
  //создание тудулиста
  const title = "New todolist"
  const todolist:DomainTodolist = { id: "todolistId3", title, addedDate: "", order: 0, filter: "all", entityStatus: "idle"  }
  const endState = todolistsReducer(startState, createTodolistTC.fulfilled(todolist, "requestId", {title}))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(title)
})

test("correct todolist should change its title", () => {
  //изменение тайтла тудулиста
  const title = "New title"
  const endState = todolistsReducer(
    startState,
    changeTodolistTitleTC.fulfilled({ id: todolistId2, title }, "requestId", { id: todolistId2, title }),
  )

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(title)
})

test("correct todolist should change its filter", () => {
  // изменение состояния фильра тудулиста
  const filter = "completed"
  const endState = todolistsReducer(startState, changeFilterAC({ todolistId: todolistId2, filter }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(filter)
})
test("correct todolist should change its status", () => {
  //изменение состояния статуса
  const status:RequestStatus = "succeeded"
  const endState = todolistsReducer(startState, changeTodolistStatusAC({todolistId: todolistId2, entityStatus:status}))
  expect(endState[0].entityStatus).toBe("idle")
  expect(endState[1].entityStatus).toBe(status)

})
