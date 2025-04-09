import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { changeTodolistTitleTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"

type TodolistPropsType = {
  todolistId: string
  title: string
}

export const TodolistTitle = (props: TodolistPropsType) => {
  const { todolistId, title } = props

  const dispatch = useAppDispatch()

  const onClickDeleteTodolistHandler = () => {
    dispatch(deleteTodolistTC({ id: todolistId }))
  }

  const removeTitleTodolistHandler = (newTitle: string) => {
    dispatch(changeTodolistTitleTC({ id: todolistId, title: newTitle }))
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
