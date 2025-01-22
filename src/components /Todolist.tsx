import {Button} from "./Button.tsx";
import {useState} from "react";
import {Input} from "./Input.tsx";
import {useAutoAnimate} from "@formkit/auto-animate/react";


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
    changeIsDoneTask:(isDone:boolean, taskId:string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const {title, onClickFilterHandler, deleteTask, tasks, addTasks,changeIsDoneTask} = props

    const [addTitle, setAddTitle] = useState('')
    const [parent] = useAutoAnimate<HTMLUListElement>()

    const addTasksFoo = () => {
        addTasks(addTitle.trim())
        setAddTitle('')
    }

    const onChangeInputCheckboxHandler = (isDone: boolean, taskId:string) => {
        changeIsDoneTask(isDone, taskId)
    }

    const inputError = (!addTitle.trim() || addTitle.length > 10)

    const renderTasks = () => {
        return (
            tasks.length ? (
                <ul ref={parent}>
                    {tasks.map(t => (
                        <li key={t.id}>
                            <Button callBack={() => deleteTask(t.id)}  name="x"/>
                            <input type="checkbox" checked={t.isDone} onChange={(e)=>onChangeInputCheckboxHandler(e.currentTarget.checked, t.id)} />
                            {t.title}
                        </li>
                    ))}
                </ul>
            ) : (
                <span>Тасок нет</span>
            )
        );
    };



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