import { CreateItemForm } from "@/common/components"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons"
import {useCreateTaskMutation} from "@/features/todolists/api/tasksApi.ts";
import {DomainTodolist} from "@/features/todolists/lib/types";



type TodolistPropsType = {
  todolist: DomainTodolist
}

export const TodolistItem = (props: TodolistPropsType) => {
  const { todolist } = props

    const [createTask,{}] = useCreateTaskMutation()

  const createTaskHandler = (titleTasks: string) => {
      createTask({todolistId: todolist.id, title: titleTasks} )
  }



  return (
    <div className="container">
      <TodolistTitle todolist={todolist} disabled={todolist.entityStatus === "loading"} />
      <CreateItemForm addItem={createTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} disabled={todolist.entityStatus === "loading"} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
