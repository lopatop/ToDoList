import './App.css'
import {onClickFilterHandlerType, TaskType, Todolist} from "../components /Todolist.tsx";
import {useState} from "react";
import {CreateItemForm} from "../components /CreateItemForm.tsx";
import {ButtonAppBar} from "../components /ButtonAppBar.tsx";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {paperStyle} from "../todolist.styles.ts";
import {createTheme, ThemeProvider} from "@mui/material";
import teal from "@mui/material/colors/teal";
import {
    addTaskAC,
    changeIsDoneTaskAC,
    removeTaskAC,
    removeTitleTaskAC,
} from "../model/tasks-reducer.ts";
import {
    changeFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
} from "../model/todolists-reducer.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectTasks} from "../model/tasks-selectors.ts";
import {selectTodolists} from "../model/todolist-selectors.ts";

export type TodolistPropsType = {
    id: string
    title: string
    filter: onClickFilterHandlerType
}
export type TasksPropsType = {
    [key: string]: TaskType[]
}

export type ThemeModePropsType = 'light' | 'dark'

function App() {


    const dispatch = useAppDispatch()
    const todolist = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)


    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC({todolistId, taskId}));
    }
    const addTasks = (todolistId: string, titleTasks: string) => {
        dispatch(addTaskAC({todolistId, titleTasks}))
    }
    const filteredTasks = (todolistId: string, filter: onClickFilterHandlerType) => {
        dispatch(changeFilterAC({todolistId: todolistId, filter: filter}))

    }
    const changeIsDoneTask = (todolistId: string, isDone: boolean, taskId: string) => {
        dispatch(changeIsDoneTaskAC({todolistId, isDone, taskId}))
    }
    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({todolistId: todolistId}))
    }


    const addTodolist = (titleTodolist: string) => {
        dispatch(createTodolistAC(titleTodolist))


    }
    const removeTitleTask = (todolistId: string, newTitle: string, taskId: string) => {
        dispatch(removeTitleTaskAC({todolistId, newTitle, taskId}))
    }
    const removeTitleTodolist = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC({todolistId, newTitle}))
    }


    const [themeMode, setThemeMode] = useState<ThemeModePropsType>('light')
    const theme = createTheme({
            palette: {
                mode: themeMode == "light" ? "light" : "dark",
                primary: teal,
                secondary: {
                    main: "#035363"
                },
            },
        }
    )
    const changeModeHandler = () => {
        setThemeMode(themeMode == "light" ? "dark" : "light")
    }

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box>
                    <ButtonAppBar onChange={changeModeHandler}/>
                    <Grid container sx={{ml: '30px'}}>
                        <CreateItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container>
                        {todolist.map(el => {

                            return (
                                <Grid item sx={{p: '30px'}} key={el.id}>
                                    <Paper elevation={5} sx={paperStyle}>
                                        <Todolist
                                            todolistId={el.id}
                                            key={el.id}
                                            title={el.title}
                                            filter={el.filter}
                                            tasks={tasks[el.id] || []}
                                            deleteTask={deleteTask}
                                            filteredTasks={filteredTasks}
                                            addTasks={addTasks}
                                            changeIsDoneTask={changeIsDoneTask}
                                            deleteTodolist={deleteTodolist}
                                            removeTitleTask={removeTitleTask}
                                            removeTitleTodolist={removeTitleTodolist}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}

                    </Grid>
                </Box>
            </ThemeProvider>
        </div>
    )
}

export default App
