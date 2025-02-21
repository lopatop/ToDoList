import './App.css'
import {onClickFilterHandlerType, TaskType, Todolist} from "./components /Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./components /CreateItemForm.tsx";

type TodolistPropsType = {
    id: string,
    title: string
    filter: onClickFilterHandlerType
}
type TasksPropsType = {
    [key: string]: TaskType[]
}

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

            <CreateItemForm addItem={addTodolist}/>
            {todolist.map(el => {
                const currentTasksFoo = () => {
                    let currentTasks = tasks[el.id];
                    if (el.filter === 'active') currentTasks = currentTasks.filter(t => !t.isDone)
                    if (el.filter === 'completed') currentTasks = currentTasks.filter(t => t.isDone)
                    return currentTasks
                }
                let tasksFilter = currentTasksFoo()

                return (
                    <Todolist
                        todolistId={el.id}
                        key={el.id}
                        title={el.title}
                        filter={el.filter}
                        tasks={tasksFilter}
                        deleteTask={deleteTask}
                        filteredTasks={filteredTasks}
                        addTasks={addTasks}
                        changeIsDoneTask={changeIsDoneTask}
                        deleteTodolist={deleteTodolist}
                        removeTitleTask={removeTitleTask}
                        removeTitleTodolist={removeTitleTodolist}
                    />

                )
            })}


        </div>
    )
}

export default App
