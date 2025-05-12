import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {TodolistItem} from "./TodolistItem/index"
import {paperStyle} from "./Todolists.styles"
import {useGetTodolistsQuery} from "@/features/todolists/api/todolistsApi.ts";
import {containerSx} from "@/common/styles";
import Box from "@mui/material/Box";
import {TodolistSkeleton} from "./TodolistSkeleton/index";


export const Todolists = () => {

    const {data: todolist, isLoading} = useGetTodolistsQuery()


    if (isLoading) {
      return (
          <Box sx ={containerSx} style={{gap: "20px", flexWrap: "wrap"}}>
              {Array(3).fill(null).map((_,id)=>( <TodolistSkeleton key={id}/>))}
          </Box>
      )
    }

    return (
        <Grid container>
            {todolist?.map((el) => {
                if(!el.id) return null
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
