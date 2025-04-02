import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { changeTodolistTitleAC, deleteTodolistAC } from "@/features/todolists/model/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

type TodolistPropsType = {
  todolistId: string
  title: string
}

export const TodolistTitle = (props: TodolistPropsType) => {
  const { todolistId, title } = props

  const dispatch = useAppDispatch()

  const onClickDeleteTodolistHandler = () => {
    dispatch(deleteTodolistAC({ todolistId }))
  }

  const removeTitleTodolistHandler = (newTitle: string) => {
    dispatch(changeTodolistTitleAC({ todolistId, newTitle }))
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
