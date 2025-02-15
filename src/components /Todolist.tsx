import {Button} from "./Button.tsx";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";


export type onClickFilterHandlerType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: string) => void
    filteredTasks: (todolistId: string, title: onClickFilterHandlerType) => void
    addTasks: (todolistId: string, titleTasks: string) => void
    changeIsDoneTask: (todolistId: string, isDone: boolean, taskId: string) => void
    filter: onClickFilterHandlerType
    deleteTodolist: (todolistId: string) => void
    removeTitleTask:(todolistId: string,newTitle: string, taskId: string) => void
    removeTitleTodolist:(todolistId: string, newTitle: string) => void

}

export const Todolist = (props: TodolistPropsType) => {
    const {
        todolistId,
        title,
        filteredTasks,
        deleteTask,
        tasks,
        addTasks,
        changeIsDoneTask,
        filter,
        deleteTodolist,
        removeTitleTask,
        removeTitleTodolist,
    } = props


    const [parent] = useAutoAnimate<HTMLUListElement>()


    const onChangeInputCheckboxHandler = (isDone: boolean, taskId: string) => {
        changeIsDoneTask(todolistId, isDone, taskId)
    }
    const onClickDeleteTaskHandler = (taskId: string) => {
        deleteTask(todolistId, taskId)
    }
    const onClickFilteredTasksHandler = (title: onClickFilterHandlerType) => {
        filteredTasks(todolistId, title)
    }
    const onClickDeleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }
    const addTaskHandler = (titleTasks:string)=>{
        addTasks(todolistId, titleTasks)
    }

    const removeTitleTaskHandler =(newTitle: string, taskId: string )=>{
        removeTitleTask(todolistId, newTitle, taskId)
    }
    const removeTitleTodolistHandler=(newTitle:string)=>{
        removeTitleTodolist(todolistId,newTitle )
    }

    const renderTasks = () => {
        return (
            tasks.length ? (
                <ul ref={parent}>
                    {tasks.map(t => (
                        <li key={t.id} >
                            <Button callBack={() => onClickDeleteTaskHandler(t.id)} name="x"/>
                                <input type="checkbox" checked={t.isDone}
                                       onChange={(e) => onChangeInputCheckboxHandler(e.currentTarget.checked, t.id)}/>
                                <EditableSpan className={t.isDone? 'isDone': ''}  title={t.title}
                                              changeTitleItem={(newTitleTask) => removeTitleTaskHandler(newTitleTask, t.id)}/>
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
            <div className='container'>
                <Button name='x' callBack={onClickDeleteTodolistHandler}/>
                <EditableSpan title={title} changeTitleItem={(newTitleTask)=>removeTitleTodolistHandler(newTitleTask)}/>
            </div>
            <CreateItemForm addItem={(title)=>addTaskHandler(title)}/>
            {renderTasks()}
            <div>
                <Button className={filter === 'all' ? 'filterOnClick' : ''}
                        callBack={() => {
                            onClickFilteredTasksHandler('all')
                        }}
                        name="All"/>
                <Button
                    className={filter === 'active' ? 'filterOnClick' : ''}
                    callBack={() => {
                        onClickFilteredTasksHandler('active')
                    }}
                    name="Active"/>
                <Button
                    className={filter === 'completed' ? 'filterOnClick' : ''}
                    callBack={() => {
                        onClickFilteredTasksHandler('completed')
                    }}
                    name="Completed"/>
            </div>
        </div>


    )
}