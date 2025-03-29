import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {paperStyle} from "@/todolist.styles.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolist-selectors.ts";
import {TodolistItem} from "@/components /Todolist.tsx";

export const Todolists = () => {
    const todolist = useAppSelector(selectTodolists)

    return (
        <Grid container>
            {todolist.map(el => {
                return (
                    <Grid item sx={{p: '30px'}} key={el.id}>
                        <Paper elevation={5} sx={paperStyle}>
                            <TodolistItem
                                key={el.id}
                                todolistId={el.id}
                                title={el.title}
                                filter={el.filter}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </Grid>
    )
}