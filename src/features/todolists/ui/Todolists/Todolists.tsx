import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { selectTodolists } from "@/features/todolists/model/todolist-selectors"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem"
import { paperStyle } from "@/features/todolists/ui/Todolists/Todolists.styles"
import { useEffect } from "react"
import { useAppDispatch } from "@/common/hooks"
import { fetchTodolistsTC } from "@/features/todolists/model/todolists-slice"

export const Todolists = () => {
  const todolist = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <Grid container>
      {todolist?.map((el) => {
        return (
          <Grid item sx={{ p: "30px" }} key={el.id}>
            <Paper elevation={5} sx={paperStyle}>
              <TodolistItem key={el.id} todolistId={el.id} title={el.title} filter={el.filter} />
            </Paper>
          </Grid>
        )
      })}
    </Grid>
  )
}
