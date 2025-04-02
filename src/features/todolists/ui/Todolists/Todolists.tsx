import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectTodolists } from "@/features/todolists/model/todolist-selectors.ts"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { paperStyle } from "@/features/todolists/ui/Todolists/Todolists.styles.ts"

export const Todolists = () => {
  const todolist = useAppSelector(selectTodolists)

  return (
    <Grid container>
      {todolist.map((el) => {
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
