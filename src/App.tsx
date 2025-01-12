import './App.css'
import {onClickFilterHandlerType, Todolist} from "./components /Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

function App() {




    const [tasks, setTasks] = useState([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
    ])

    const addTasks =(titleTasks:string)=>{
        let newTasks = {id: v1(), title: titleTasks, isDone: false}
        setTasks([newTasks, ...tasks])
    }
    const deleteTask = (taskId: string) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
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
