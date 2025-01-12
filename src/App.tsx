import './App.css'
import {onClickFilterHandlerType, Todolist} from "./components /Todolist.tsx";
import {useState} from "react";

function App() {




    const [tasks, setTask] = useState([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: true},
        {id: 4, title: "Redux", isDone: false},
    ])

    const addTasks =(title:string)=>{
        const newTasks = {id: 4, title: title, isDone: false}
        setTask=[newTasks, ...tasks]
    }
    const deleteTask = (taskId: number) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTask(updatedTasks)
    }

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

    let tasksFilter = currentTasksFoo()


    return (
        <div className="app">
            <Todolist title="What to learn"
                      tasks={tasksFilter}
                      deleteTask={deleteTask}
                      onClickFilterHandler={onClickFilterHandler}
                      addTasks={addTasks}/>

        </div>
    )
}

export default App
