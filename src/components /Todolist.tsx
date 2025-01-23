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
    filter: onClickFilterHandlerType

}

export const Todolist = (props: TodolistPropsType) => {
    const {title, onClickFilterHandler, deleteTask, tasks, addTasks,changeIsDoneTask,filter} = props

    const [addTitle, setAddTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [parent] = useAutoAnimate<HTMLUListElement>()

    const inputError = (!addTitle.trim() || addTitle.length > 10)

    const addTasksFoo = () => {
        if (!inputError){
            addTasks(addTitle.trim())
        }else{setError('Enter a note, max 10 characters!') }
        setAddTitle('')
    }

    const onChangeInputCheckboxHandler = (isDone: boolean, taskId:string) => {
        changeIsDoneTask(isDone, taskId)
    }



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
                       addTasksFoo={addTasksFoo}
                       className={error? 'errorInput': ''}
                       setError={setError}/>
                <Button callBack={addTasksFoo}
                        disabled={inputError}
                        name="+"/>

            </div>
            {error && <span className='errorMessage'>{error}</span>}
            {renderTasks()}
            <div>
                <Button className={filter === 'all'? 'filterOnClick': ''}
                        callBack={() => {onClickFilterHandler('all')}}
                        name="All"/>
                <Button
                    className={filter === 'active'? 'filterOnClick': ''}
                    callBack={() => {onClickFilterHandler('active')}}
                    name="Active"/>
                <Button
                    className={filter === 'completed'? 'filterOnClick': ''}
                    callBack={() => {onClickFilterHandler('completed')}}
                    name="Completed"/>
            </div>
        </div>


    )
}