import {Button} from "./Button.tsx";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
}

export const Todolist = (props:TodolistPropsType) => {
    const{title, tasks}= props

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(t =>{
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>{t.title}
                            <button>x</button>
                        </li>
                    )
                })}


            </ul>
            <div>
                <Button name="All"/>
                <Button name="Active"/>
                <Button name="Completed"/>
            </div>
        </div>


    )
}