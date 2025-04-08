import List from "@mui/material/List"
import { onClickFilterHandlerType } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectTasks } from "@/features/todolists/model/tasks-selectors.ts"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { useAppDispatch } from "@/common/hooks"
import { useEffect } from "react"
import { fetchTasksTC } from "@/features/todolists/model/tasks-slice.ts"

type TodolistPropsType = {
  todolistId: string
  title: string
  filter: onClickFilterHandlerType
}

export const Tasks = (props: TodolistPropsType) => {
  const { todolistId, filter } = props

  const [parent] = useAutoAnimate<HTMLUListElement>()
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTasksTC(todolistId))
  }, [])

  let currentTasks: DomainTask[] = tasks[todolistId] || []
  if (filter === "active") currentTasks = currentTasks.filter((t) => t.status === TaskStatus.New)
  if (filter === "completed") currentTasks = currentTasks.filter((t) => t.status === TaskStatus.Completed)

  return (
    <>
      {currentTasks.length ? (
        <List ref={parent}>
          {currentTasks.map((t: DomainTask) => (
            <TaskItem key={t.id} todolistId={todolistId} t={t} />
          ))}
        </List>
      ) : (
        <span>Тасок нет</span>
      )}
    </>
  )
}
