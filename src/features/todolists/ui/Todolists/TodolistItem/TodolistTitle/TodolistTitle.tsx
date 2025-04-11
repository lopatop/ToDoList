import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { changeTodolistTitleTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice"
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
      <EditableSpan title={title} changeTitleItem={(newTitleTask) => removeTitleTodolistHandler(newTitleTask)} />
      <IconButton aria-label="delete" onClick={onClickDeleteTodolistHandler}>
        <Delete />
      </IconButton>
    </h3>
  )
}
