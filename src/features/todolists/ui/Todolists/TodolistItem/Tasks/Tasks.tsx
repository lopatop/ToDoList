import List from "@mui/material/List"
import {useAutoAnimate} from "@formkit/auto-animate/react"
import {DomainTask} from "@/features/todolists/api/tasksApi.types"
import {TaskStatus} from "@/common/enums/enums"
import {useGetTasksQuery} from "@/features/todolists/api/tasksApi.ts";
import {TasksSkeleton} from "./TasksSkeleton/index.ts";
import {DomainTodolist} from "@/features/todolists/lib/types";
import {TaskItem} from "./TaskItem";
import {useState} from "react";
import {TaskPagination} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskPagination";

type TodolistPropsType = {
    todolist: DomainTodolist
}
export const Tasks = (props: TodolistPropsType) => {
    const {todolist} = props
    const [parent] = useAutoAnimate<HTMLUListElement>()

    const [page, setPage] = useState(1)

    const {data, isLoading} = useGetTasksQuery({todolistId: todolist.id, params: {page: page}}, {
        skip: !todolist.id,
    })

    if (isLoading) {
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
                        <TaskItem key={t.id} todolistId={todolist.id} t={t}/>
                    ))}
                </List>

            ) : (
                <span>Тасок нет</span>
            )}
            <TaskPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage}
            />
        </>
    )
}
