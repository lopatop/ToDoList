import {Button} from "./Button.tsx";

export type onClickFilterHandlerType = 'all' | 'active' | 'completed'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId:number) => void
    onClickFilterHandler:(title:onClickFilterHandlerType)=>void
}

export const Todolist = (props: TodolistPropsType) => {
    const {title,onClickFilterHandler,deleteTask,tasks} = props




    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <Button name="+"/>
            </div>
            {tasks.length ? (
                <ul>
                    {tasks.map(t => {
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