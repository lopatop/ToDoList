import Grid from "@mui/material/Grid"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { createTodolistTC } from "@/features/todolists/model/todolists-slice"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"

export const Main = () => {
  const dispatch = useAppDispatch()
  const addTodolist = (titleTodolist: string) => {
    dispatch(createTodolistTC({ title: titleTodolist }))
  }
  return (
    <>
      <Grid container sx={{ ml: "30px" }}>
        <CreateItemForm addItem={addTodolist} />
      </Grid>
      <Todolists />
    </>
  )
}
