import {Button} from "./Button.tsx";
import {useState} from "react";
import {Input} from "./Input.tsx";

export type onClickFilterHandlerType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId:number) => void
    onClickFilterHandler:(title:onClickFilterHandlerType)=>void
    addTasks:(title:string)=>void
}

export const Todolist = (props: TodolistPropsType) => {
    const {title,onClickFilterHandler,deleteTask,tasks,addTasks} = props

    const[addTitle, setAddTitle] = useState('')

    const addTasksFoo =()=>{
        addTasks(addTitle)
        setAddTitle('')
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <Input addTitle ={addTitle} setAddTitle={setAddTitle} />
                <Button callBack={addTasksFoo} name="+"/>
            </div>
            {tasks.length ? (
                <ul>
                    {tasks.map(t => {
                        return (
                            <li key={t.id}>
                                <Button callBack={() => {
                                    deleteTask(t.id)
                                }} name="x"/>
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