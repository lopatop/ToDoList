import List from "@mui/material/List"
import { onClickFilterHandlerType, TaskType } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectTasks } from "@/features/todolists/model/tasks-selectors.ts"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"

type TodolistPropsType = {
  todolistId: string
  title: string
  filter: onClickFilterHandlerType
}

export const Tasks = (props: TodolistPropsType) => {
  const { todolistId, filter } = props

  const [parent] = useAutoAnimate<HTMLUListElement>()
  const tasks = useAppSelector(selectTasks)

  let currentTasks: TaskType[] = tasks[todolistId] || []
  if (filter === "active") currentTasks = currentTasks.filter((t) => !t.isDone)
  if (filter === "completed") currentTasks = currentTasks.filter((t) => t.isDone)

  return (
    <>
      {currentTasks.length ? (
        <List ref={parent}>
          {currentTasks.map((t: TaskType) => (
            <TaskItem key={t.id} todolistId={todolistId} t={t} />
          ))}
        </List>
      ) : (
        <span>Тасок нет</span>
      )}
    </>
  )
}
