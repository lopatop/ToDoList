import List from "@mui/material/List"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { selectTasks } from "@/features/todolists/model/tasks-selectors"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem"
import { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums/enums"
import { useAppDispatch } from "@/common/hooks"
import { useEffect } from "react"
import { fetchTasksTC } from "@/features/todolists/model/tasks-slice"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

type TodolistPropsType = {
  todolist: DomainTodolist
  disabled: boolean
}
export const Tasks = (props: TodolistPropsType) => {
  const { todolist, disabled } = props

  const [parent] = useAutoAnimate<HTMLUListElement>()
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

  let currentTasks: DomainTask[] = tasks[todolist.id] || []
  if (todolist.filter === "active") currentTasks = currentTasks.filter((t) => t.status === TaskStatus.New)
  if (todolist.filter === "completed") currentTasks = currentTasks.filter((t) => t.status === TaskStatus.Completed)

  return (
    <>
      {currentTasks.length ? (
        <List ref={parent}>
          {currentTasks.map((t: DomainTask) => (
            <TaskItem key={t.id} todolistId={todolist.id} t={t} disabled={disabled} />
          ))}
        </List>
      ) : (
        <span>Тасок нет</span>
      )}
    </>
  )
}
