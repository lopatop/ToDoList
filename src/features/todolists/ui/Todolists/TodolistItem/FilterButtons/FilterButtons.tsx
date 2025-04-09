import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { changeFilterAC } from "@/features/todolists/model/todolists-slice"
import { onClickFilterHandlerType } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { filterButtonContainerStyle } from "./FilterBittons.styles"

type TodolistPropsType = {
  todolistId: string
  title: string
  filter: onClickFilterHandlerType
}

export const FilterButtons = (props: TodolistPropsType) => {
  const { todolistId, filter } = props

  const dispatch = useAppDispatch()

  const onClickFilteredTasksHandler = (title: onClickFilterHandlerType) => {
    dispatch(changeFilterAC({ todolistId, filter: title }))
  }

  return (
    <Box sx={filterButtonContainerStyle}>
      <Button
        variant={"contained"}
        size={"small"}
        color={filter === "all" ? "secondary" : "primary"}
        onClick={() => {
          onClickFilteredTasksHandler("all")
        }}
      >
        All
      </Button>
      <Button
        variant={"contained"}
        size={"small"}
        color={filter === "active" ? "secondary" : "primary"}
        onClick={() => {
          onClickFilteredTasksHandler("active")
        }}
      >
        Active
      </Button>
      <Button
        variant={"contained"}
        size={"small"}
        color={filter === "completed" ? "secondary" : "primary"}
        onClick={() => {
          onClickFilteredTasksHandler("completed")
        }}
      >
        Completed
      </Button>
    </Box>
  )
}
