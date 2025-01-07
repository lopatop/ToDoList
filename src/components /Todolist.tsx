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
    const deleteTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id)
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
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <Button name="+"/>
            </div>
            {tasksFilter.length ? (
                <ul>
                    {tasksFilter.map(t => {
                        return (
                            <li key={t.id}>
                                <Button callBack={() => {
                                    deleteTask(t.id)
                                }} name="-"/>
                                <input type="checkbox" checked={t.isDone}/>{t.title}

                            </li>
                        )
                    })}
                </ul>
            ) : (
                <span>Тасок нет</span>
            )}

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