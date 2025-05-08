import Grid from "@mui/material/Grid"
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm"
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists"
import {useCreateTodolistMutation} from "@/features/todolists/api/todolistsApi.ts";

export const Main = () => {

    const [createTodolist,{}] = useCreateTodolistMutation()

    const createTodolistHandler = (titleTodolist: string) => {
        createTodolist(titleTodolist)
    }
    return (
        <>
            <Grid container sx={{ml: "30px"}}>
                <CreateItemForm addItem={createTodolistHandler}/>
            </Grid>
            <Todolists/>
        </>
    )
}
