import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { changeFilterAC, DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { onClickFilterHandlerType } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { filterButtonContainerStyle } from "./FilterBittons.styles"

type TodolistPropsType = {
  todolist: DomainTodolist
}

export const FilterButtons = (props: TodolistPropsType) => {
  const { todolist } = props

  const dispatch = useAppDispatch()

  const onClickFilteredTasksHandler = (filter: onClickFilterHandlerType) => {
    dispatch(changeFilterAC({ todolistId: todolist.id, filter }))
  }

  return (
    <Box sx={filterButtonContainerStyle}>
      <Button
        variant={"contained"}
        size={"small"}
        color={todolist.filter === "all" ? "secondary" : "primary"}
        onClick={() => {
          onClickFilteredTasksHandler("all")
        }}
      >
        All
      </Button>
      <Button
        variant={"contained"}
        size={"small"}
        color={todolist.filter === "active" ? "secondary" : "primary"}
        onClick={() => {
          onClickFilteredTasksHandler("active")
        }}
      >
        Active
      </Button>
      <Button
        variant={"contained"}
        size={"small"}
        color={todolist.filter === "completed" ? "secondary" : "primary"}
        onClick={() => {
          onClickFilteredTasksHandler("completed")
        }}
      >
        Completed
      </Button>
    </Box>
  )
}
