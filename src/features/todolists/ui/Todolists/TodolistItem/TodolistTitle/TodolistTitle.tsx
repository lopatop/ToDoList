import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import {
    useChangeTodolistTitleMutation,
    useDeleteTodolistMutation
} from "@/features/todolists/api/todolistsApi.ts";
import {DomainTodolist} from "@/features/todolists/lib/types";
import {EditableSpan} from "@/common/components";

type TodolistPropsType = {
    todolist: DomainTodolist
}


export const TodolistTitle = (props: TodolistPropsType) => {
    const {todolist} = props


    const [changeTodolistTitle, {}] = useChangeTodolistTitleMutation()
    const [deleteTodolist] = useDeleteTodolistMutation()


    const deleteTodolistHandler = ()=>{
       deleteTodolist(todolist.id)
    }



    const changeTitleTodolistHandler = (newTitle: string) => {
        changeTodolistTitle({id: todolist.id, title: newTitle})
    }

    const iconButtonStyle = { position: "absolute", right: 20, top: 20 }

    return (
        <h3>
            <span >
                <EditableSpan
                    title={todolist.title}
                    changeTitleItem={changeTitleTodolistHandler}
                />
                <IconButton
                    sx={iconButtonStyle}
                    aria-label="delete"
                    onClick={deleteTodolistHandler}
                >
                    <Delete />
                </IconButton>
            </span>
        </h3>
    )
}
