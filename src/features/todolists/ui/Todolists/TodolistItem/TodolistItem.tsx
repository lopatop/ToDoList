import { CreateItemForm } from "@/common/components"

import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons"
import { createTaskTC } from "@/features/todolists/model/tasks-slice"

export type onClickFilterHandlerType = "all" | "active" | "completed"

type TodolistPropsType = {
  todolistId: string
  title: string
  filter: onClickFilterHandlerType
}

export const TodolistItem = (props: TodolistPropsType) => {
  const { todolistId, filter, title } = props
  const dispatch = useAppDispatch()

  const addTaskHandler = (titleTasks: string) => {
    dispatch(createTaskTC({ todolistId, title: titleTasks }))
  }

  return (
    <div className="container">
      <TodolistTitle todolistId={todolistId} title={title} />
      <CreateItemForm addItem={addTaskHandler} />
      <Tasks todolistId={todolistId} filter={filter} title={title} />
      <FilterButtons filter={filter} title={title} todolistId={todolistId} />
    </div>
  )
}
