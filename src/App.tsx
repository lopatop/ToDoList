import './App.css'
import {onClickFilterHandlerType, Todolist} from "./components /Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

type TodolistPropsType = {
    id: string,
    title: string
    filter: onClickFilterHandlerType
}

function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolist, setTodolist] = useState<TodolistPropsType[]>([
        {id: todolistId1, title: 'What to learn-1', filter: 'all'},
        {id: todolistId2, title: 'What to learn-2', filter: 'all'}
    ]);

    const [tasks, setTasks] = useState({
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

    const [filter, setFilter] = useState<onClickFilterHandlerType>('all')
    const onClickFilterHandler = (title: onClickFilterHandlerType) => {
        setFilter(title)
    }

    const currentTasksFoo = () => {
        let currentTasks = tasks
        if (filter === 'active') currentTasks = tasks.filter(t => !t.isDone)
        if (filter === 'completed') currentTasks = tasks.filter(t => t.isDone)
        return currentTasks
    }

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
        // const updatedTasks = tasks.filter(task => task.id !== taskId)
        // setTasks(updatedTasks)
    }

    const changeIsDoneTask = (isDone:boolean, taskId:string)=>{
    const changeIsDone = tasks.map(t => t.id === taskId? {...t, isDone:isDone}:t)
        setTasks(changeIsDone)
    }


    return (
        <div className="app">
            <Todolist title="What to learn"
                      tasks={tasksFilter}
                      deleteTask={deleteTask}
                      onClickFilterHandler={onClickFilterHandler}
                      addTasks={addTasks}
                      changeIsDoneTask={changeIsDoneTask}
                      filter={filter}/>
        </div>
    )
}

export default App
