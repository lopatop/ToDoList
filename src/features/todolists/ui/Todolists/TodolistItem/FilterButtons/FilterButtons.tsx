import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";
import {containerSx} from "@/common/styles";
import {DomainTodolist, FilterValues} from "@/features/todolists/lib/types";

type TodolistPropsType = {
  todolist: DomainTodolist
}

export const FilterButtons = ({todolist}: TodolistPropsType) => {
  const {id, filter } = todolist



  const dispatch = useAppDispatch()

  const onClickFilteredTasksHandler = (filter: FilterValues) => {
    dispatch(todolistsApi.util.updateQueryData('getTodolists', undefined, (todolists) => {
    const todo = todolists.find(t=> t.id === id)
        if (todo){
            todo.filter = filter
        }
    }))
  }

  return (
    <Box sx={containerSx}>
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
