import { expect, test } from "vitest"
import { TasksPropsType, createTaskTC, tasksReducer, deleteTasksTC, updateTaskTC } from "../tasks-slice"
import { nanoid } from "@reduxjs/toolkit"
import { TaskPriority, TaskStatus } from "@/common/enums/enums"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api"

test("correct task should be added", () => {
  const todolistId1 = nanoid()
  const todolistId2 = nanoid()

  const taskDefaultValues = {
    description: "",
    deadline: "",
    addedDate: "",
    startDate: "",
    priority: TaskPriority.Low,
    order: 0,
  }

  let startState: TasksPropsType = {}

  beforeEach(() => {
    startState = {
      [todolistId1]: [
        {
          id: "1",
          title: "CSS",
          status: TaskStatus.New,
          todoListId: todolistId1,
          ...taskDefaultValues,
        },
      ],
      [todolistId2]: [
        {
          id: "1",
          title: "bread",
          status: TaskStatus.New,
          todoListId: todolistId2,
          ...taskDefaultValues,
        },
      ],
    }
  })

  const newTask: DomainTask = {
    id: "999",
    title: "New Task",
    status: TaskStatus.New,
    todoListId: todolistId1,
    ...taskDefaultValues,
  }

  const action = createTaskTC.fulfilled({ todolistId: todolistId1, task: newTask }, "requestId", {
    todolistId: todolistId1,
    title: newTask.title,
  })

  const endState = tasksReducer(startState, action)

  expect(endState[todolistId1].length).toBe(2) //
  expect(endState[todolistId1][0].title).toBe("New Task")
})

test("correct task should be removed", () => {
  const todolistId = nanoid()
  const taskId = nanoid()

  const taskDefaultValues = {
    description: "",
    deadline: "",
    addedDate: "",
    startDate: "",
    priority: TaskPriority.Low,
    order: 0,
  }

  const startState: TasksPropsType = {
    [todolistId]: [
      {
        id: taskId,
        title: "Task to remove",
        status: TaskStatus.New,
        todoListId: todolistId,
        ...taskDefaultValues,
      },
    ],
  }

  const action = deleteTasksTC.fulfilled({ todolistId, taskId }, "requestId", {
    todolistId,
    taskId,
  })

  const endState = tasksReducer(startState, action)

  expect(endState[todolistId].length).toBe(0)
})

test("correct task should change its isDone status", () => {
  const todolistId = nanoid()
  const taskId = nanoid()

  const taskDefaultValues = {
    description: "",
    deadline: "",
    addedDate: "",
    startDate: "",
    priority: TaskPriority.Low,
    order: 0,
  }
  const startState: TasksPropsType = {
    [todolistId]: [
      { id: taskId, title: "Task to change", todoListId: todolistId, status: TaskStatus.New, ...taskDefaultValues },
    ],
  }

  const updatedTask: DomainTask = {
    id: taskId,
    todoListId: todolistId,
    title: "title",
    status: TaskStatus.Completed,
    description: "description",
    priority: TaskPriority.Low,
    startDate: "",
    deadline: "",
    addedDate: "",
    order: 0,
  }

  const domainModel: Partial<UpdateTaskModel> = {
    title: "title",
    description: "description",
    status: TaskStatus.Completed,
    priority: TaskPriority.Low,
    startDate: "",
    deadline: "",
  }

  const action = updateTaskTC.fulfilled({ task: updatedTask }, "fakeRequestId", { todolistId, taskId, domainModel })
  const endState = tasksReducer(startState, action)

  expect(endState[todolistId][0].status).toBe(TaskStatus.Completed)
})

test("should update task title and status correctly", () => {
  const todolistId = nanoid()
  const taskId = nanoid()

  const taskDefaultValues = {
    description: "",
    deadline: "",
    addedDate: "",
    startDate: "",
    priority: TaskPriority.Low,
    order: 0,
  }

  const newTitle = "newTitle"

  const startState: TasksPropsType = {
    [todolistId]: [
      {
        id: taskId,
        title: "old title",
        todoListId: todolistId,
        status: TaskStatus.Completed,
        ...taskDefaultValues,
      },
    ],
  }

  const updatedTask: DomainTask = {
    id: taskId,
    todoListId: todolistId,
    title: newTitle,
    status: TaskStatus.New,
    description: "description",
    priority: TaskPriority.Low,
    startDate: "",
    deadline: "",
    addedDate: "",
    order: 0,
  }

  const domainModel: Partial<UpdateTaskModel> = {
    title: newTitle,
    description: "description",
    status: TaskStatus.New,
    priority: TaskPriority.Low,
    startDate: "",
    deadline: "",
  }

  const action = updateTaskTC.fulfilled({ task: updatedTask }, "fakeRequestId", { todolistId, taskId, domainModel })

  const endState = tasksReducer(startState, action)

  expect(endState[todolistId][0].title).toBe(newTitle)
  expect(endState[todolistId][0].id).toBe(taskId)
  expect(endState[todolistId][0].status).toBe(TaskStatus.New)
})
