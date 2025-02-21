import './App.css'
import {onClickFilterHandlerType, TaskType, Todolist} from "./components /Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./components /CreateItemForm.tsx";
import {ButtonAppBar} from "./components /ButtonAppBar.tsx";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {paperStyle} from "./todolist.styles.ts";
import {createTheme, ThemeProvider} from "@mui/material";
import teal from "@mui/material/colors/teal";

type TodolistPropsType = {
    id: string,
    title: string
    filter: onClickFilterHandlerType
}
type TasksPropsType = {
    [key: string]: TaskType[]
}

export type ThemeModePropsType = 'light' | 'dark'

function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolist, setTodolist] = useState<TodolistPropsType[]>([
        {id: todolistId1, title: 'What to learn-1', filter: 'all'},
        {id: todolistId2, title: 'What to learn-2', filter: 'all'}
    ]);

    const [tasks, setTasks] = useState<TasksPropsType>({
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ]
    })


    const addTasks = (todolistId: string, titleTasks: string) => {
        let newTasks = {id: v1(), title: titleTasks, isDone: false}
        const newState = {...tasks, [todolistId]: [newTasks, ...tasks[todolistId]]}
        setTasks(newState)
    }
    const filteredTasks = (todolistId: string, filter: onClickFilterHandlerType) => {
        const newState = todolist.map(tl => tl.id === todolistId ? {...tl, filter} : tl)
        setTodolist(newState)

    }

    const deleteTask = (todolistId: string, taskId: string) => {
        const newState = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        setTasks(newState)
    }

    const changeIsDoneTask = (todolistId: string, isDone: boolean, taskId: string) => {
        const newState = {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)}
        setTasks(newState)
    }
    const deleteTodolist = (todolistId: string) => {
        const newState = todolist.filter(t => t.id !== todolistId)
        delete tasks[todolistId]
        setTodolist(newState)
    }
    const addTodolist = (titleTodolist: string) => {
        const todolistId = v1();
        const newTodolist:TodolistPropsType = {id: todolistId, title: titleTodolist, filter: 'all'}
        setTodolist([newTodolist,...todolist])
        setTasks({...tasks, [todolistId]: []})
    }
    const removeTitleTask=(todolistId: string,newTitle: string, taskId: string)=>{
        const newState ={...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId?{...t,title:newTitle}:t)}
        setTasks(newState)
    }
    const removeTitleTodolist =(todolistId: string, newTitle: string)=>{
        const newState = todolist.map(t => t.id === todolistId?{...t,title:newTitle}:t)
        setTodolist(newState)
    }



    const [themeMode, setThemeMode] = useState<ThemeModePropsType>('light')
    const theme = createTheme({
            palette: {
                mode: themeMode == "light"?"light":"dark",
                primary: teal,
                secondary: {
                    main: "#035363"
                },
            },
        }
    )
    const changeModeHandler =()=>{
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
                                <Grid item sx={{p: '30px'}}>
                                    <Paper elevation={5} sx={paperStyle}>
                                        <Todolist
                                            todolistId={el.id}
                                            key={el.id}
                                            title={el.title}
                                            filter={el.filter}
                                            tasks={tasks[el.id]}
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
