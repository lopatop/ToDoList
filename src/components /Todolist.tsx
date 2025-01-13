import {Button} from "./Button.tsx";
import {useState} from "react";
import {Input} from "./Input.tsx";

export type onClickFilterHandlerType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    onClickFilterHandler: (title: onClickFilterHandlerType) => void
    addTasks: (titleTasks: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const {title, onClickFilterHandler, deleteTask, tasks, addTasks} = props

    const [addTitle, setAddTitle] = useState('')

    const addTasksFoo = () => {
        addTasks(addTitle)
        setAddTitle('')
    }

    const renderTasks = () => {
        return (
            tasks.length ? (
                <ul>
                    {tasks.map(t => (
                        <li key={t.id}>
                            <Button callBack={() => deleteTask(t.id)}  name="x"/>
                            <input type="checkbox" checked={t.isDone} readOnly/>
                            {t.title}
                        </li>
                    ))}
                </ul>
            ) : (
                <span>Тасок нет</span>
            )
        );
    };

    const inputError = (!addTitle.trim() || addTitle.length > 10)

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <Input addTitle={addTitle}
                       setAddTitle={setAddTitle}
                       addTasksFoo={addTasksFoo}/>
                <Button callBack={addTasksFoo}
                        disabled={inputError}
                        name="+"/>
            </div>
            {renderTasks()}
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