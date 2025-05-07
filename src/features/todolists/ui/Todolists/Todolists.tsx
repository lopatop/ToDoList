import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem"
import {paperStyle} from "@/features/todolists/ui/Todolists/Todolists.styles"
import {useGetTodolistsQuery} from "@/features/todolists/api/todolistsApi.ts";


export const Todolists = () => {

    const {data: todolist} = useGetTodolistsQuery()

    return (
        <Grid container>
            {todolist?.map((el) => {
                return (
                    <Grid item sx={{p: "30px"}} key={el.id}>
                        <Paper elevation={5} sx={paperStyle}>
                            <TodolistItem key={el.id} todolist={el}/>
                        </Paper>
                    </Grid>
                )
            })}
        </Grid>
    )
}
