import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { changeTodolistTitleTC, deleteTodolistTC, DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"

type TodolistPropsType = {
  todolist: DomainTodolist
  disabled: boolean
}

export const TodolistTitle = (props: TodolistPropsType) => {
  const { todolist } = props

  const dispatch = useAppDispatch()

  const onClickDeleteTodolistHandler = () => {
    dispatch(deleteTodolistTC({ id: todolist.id }))
  }

  const removeTitleTodolistHandler = (newTitle: string) => {
    dispatch(changeTodolistTitleTC({ id: todolist.id, title: newTitle }))
  }

  return (
    <h3>
      <EditableSpan
        title={todolist.title}
        changeTitleItem={(newTitleTask) => removeTitleTodolistHandler(newTitleTask)}
        disabled={todolist.entityStatus === "loading"}
      />
      <IconButton
        aria-label="delete"
        onClick={onClickDeleteTodolistHandler}
        disabled={todolist.entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
    </h3>
  )
}
