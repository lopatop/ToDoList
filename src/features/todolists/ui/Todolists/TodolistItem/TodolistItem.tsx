import { CreateItemForm } from "../../../../../common/components/CreateItemForm/CreateItemForm.tsx"
import { addTaskAC } from "@/features/todolists/model/tasks-reducer.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx"

export type onClickFilterHandlerType = "all" | "active" | "completed"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  todolistId: string
  title: string
  filter: onClickFilterHandlerType
}

export const TodolistItem = (props: TodolistPropsType) => {
  const { todolistId, filter, title } = props
  const dispatch = useAppDispatch()

  const addTaskHandler = (titleTasks: string) => {
    dispatch(addTaskAC({ todolistId, titleTasks }))
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
