import './App.css'
import {Todolist} from "./components /Todolist.tsx";

function App() {

    const tasks = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: true},
        {id: 4, title: "Redux", isDone: false},
    ]


    return (
        <div className="app">
            <Todolist title="What to learn"
                      tasks={tasks}/>

        </div>
    )
}

export default App
