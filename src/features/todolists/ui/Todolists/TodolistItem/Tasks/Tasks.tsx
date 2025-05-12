import List from "@mui/material/List"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { TaskStatus } from "@/common/enums/enums"
import {useGetTasksQuery} from "@/features/todolists/api/tasksApi.ts";
import {TasksSkeleton} from "./TasksSkeleton/index.ts";
import {DomainTodolist} from "@/features/todolists/lib/types";
import {TaskItem} from "./TaskItem";

type TodolistPropsType = {
  todolist: DomainTodolist
  disabled: boolean
}
export const Tasks = (props: TodolistPropsType) => {
  const { todolist, disabled } = props
  const [parent] = useAutoAnimate<HTMLUListElement>()



const {data, isLoading} = useGetTasksQuery(todolist.id, {
  skip: !todolist.id,
})





  if(isLoading){
    return <TasksSkeleton/>
  }

  let currentTasks = data?.items
  if (todolist.filter === "active") currentTasks = currentTasks?.filter((t) => t.status === TaskStatus.New)
  if (todolist.filter === "completed") currentTasks = currentTasks?.filter((t) => t.status === TaskStatus.Completed)


  return (
    <>
      {currentTasks?.length ? (
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
