import {Button} from "./Button.tsx";
import {useState} from "react";
export type onClickFilterHandlerType = 'all' | 'active' | 'completed'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
}

export const Todolist = (props: TodolistPropsType) => {
    const {title, tasks: initialTasks} = props

    const [tasks, setTask] = useState(initialTasks)
    const [filter, setFilter] = useState<onClickFilterHandlerType>('all')

    const deleteTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTask(updatedTasks)
    }

    let currentTasks = tasks
    if (filter === 'active') currentTasks = tasks.filter(t => !t.isDone)
    if (filter === 'completed') currentTasks = tasks.filter(t => t.isDone)

    const onClickFilterHandler = (filterType: onClickFilterHandlerType) => {
        setFilter(filterType)


    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <Button name="+"/>
            </div>
            <ul>
                {currentTasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>{t.title}
                            <Button callBack={() => {
                                deleteTask(t.id)
                            }} name="-"/>
                        </li>
                    )
                })}


            </ul>
            <div>
                <Button callBack={() => {
                    onClickFilterHandler('all')
                }} name="All"/>
                <Button callBack={() => {
                    onClickFilterHandler('active')
                }} name="Active"/>
                <Button callBack={() => {
                    onClickFilterHandler('completed')
                }} name="Completed"/>
            </div>
        </div>


    )
}