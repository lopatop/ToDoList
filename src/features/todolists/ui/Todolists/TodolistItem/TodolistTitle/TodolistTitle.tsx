import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import {
    todolistsApi,
    useChangeTodolistTitleMutation,
    useDeleteTodolistMutation
} from "@/features/todolists/api/todolistsApi.ts";
import {useAppDispatch} from "@/common/hooks";
import {DomainTodolist} from "@/features/todolists/lib/types";
import {EditableSpan} from "@/common/components";
import {RequestStatus} from "@/common/types/types.ts";

type TodolistPropsType = {
    todolist: DomainTodolist
    disabled: boolean
}




export const TodolistTitle = (props: TodolistPropsType) => {
    const {todolist} = props


    const [changeTodolistTitle, {}] = useChangeTodolistTitleMutation()
    const [deleteTodolist] = useDeleteTodolistMutation()
    const dispatch = useAppDispatch()


    const changeTodolistStatus = (entityStatus: RequestStatus) =>{
        dispatch(todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
            const todo = state.find(t => t.id === todolist.id)
            if (todo){
                todo.entityStatus = entityStatus
            }
        }))
    }


    const deleteTodolistHandler = () => {
        changeTodolistStatus("loading")
        deleteTodolist(todolist.id).unwrap().catch(()=>{
            changeTodolistStatus("idle")
        })
    }
    
 const changeTitleTodolistHandler = (newTitle: string) => {
        changeTodolistTitle({id: todolist.id, title: newTitle})
    }

    return (
        <h3>
            <EditableSpan
                title={todolist.title}
                changeTitleItem={changeTitleTodolistHandler}
                disabled={todolist.entityStatus === "loading"}
            />
            <IconButton
                aria-label="delete"
                onClick={deleteTodolistHandler}
                disabled={todolist.entityStatus === "loading"}
            >
                <Delete/>
            </IconButton>
        </h3>
    )
}
