import { CreateItemForm } from "@/common/components"

import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons"
import { createTaskTC } from "@/features/todolists/model/tasks-slice"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

export type onClickFilterHandlerType = "all" | "active" | "completed"

type TodolistPropsType = {
  todolist: DomainTodolist
}

export const TodolistItem = (props: TodolistPropsType) => {
  const { todolist } = props
  const dispatch = useAppDispatch()

  const addTaskHandler = (titleTasks: string) => {
    dispatch(createTaskTC({ todolistId: todolist.id, title: titleTasks }))
  }

  return (
    <div className="container">
      <TodolistTitle todolist={todolist} disabled={todolist.entityStatus === "loading"} />
      <CreateItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} disabled={todolist.entityStatus === "loading"} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
