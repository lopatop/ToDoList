import {useAutoAnimate} from "@formkit/auto-animate/react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Clear from '@mui/icons-material/Clear';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {filterButtonContainerStyle, listItemStyle} from "../todolist.styles.ts";

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
    removeTitleTask: (todolistId: string, newTitle: string, taskId: string) => void
    removeTitleTodolist: (todolistId: string, newTitle: string) => void

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

    const currentTasksFoo = () => {
        let currentTasks = tasks;
        if (filter === 'active') currentTasks = currentTasks.filter(t => !t.isDone)
        if (filter === 'completed') currentTasks = currentTasks.filter(t => t.isDone)
        return currentTasks
    }
    let tasksFilter = currentTasksFoo()


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
    const addTaskHandler = (titleTasks: string) => {
        addTasks(todolistId, titleTasks)
    }

    const removeTitleTaskHandler = (newTitle: string, taskId: string) => {
        removeTitleTask(todolistId, newTitle, taskId)
    }
    const removeTitleTodolistHandler = (newTitle: string) => {
        removeTitleTodolist(todolistId, newTitle)
    }



    const renderTasks = () => {
        return (
            tasksFilter.length ? (
                <List ref={parent}>
                    {tasksFilter.map(t => (
                        <ListItem
                            key={t.id}
                            sx={listItemStyle}
                        >
                            <Box>
                                <Checkbox size={'small'}
                                          checked={t.isDone}
                                          onChange={(e) => onChangeInputCheckboxHandler(e.currentTarget.checked, t.id)}/>

                                <EditableSpan isDone={t.isDone}
                                              title={t.title}
                                              changeTitleItem={(newTitleTask) => removeTitleTaskHandler(newTitleTask, t.id)}/>
                            </Box>
                            <IconButton aria-label="delete" onClick={() => onClickDeleteTaskHandler(t.id)}>
                                <Clear/>
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <span>Тасок нет</span>
            )
        );
    };


    return (
        <div className='container'>
            <h3>
                <EditableSpan title={title}
                              changeTitleItem={(newTitleTask) => removeTitleTodolistHandler(newTitleTask)}/>
                <IconButton aria-label="delete"
                            onClick={onClickDeleteTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <Box>

                <CreateItemForm addItem={(title) => addTaskHandler(title)}/>
                {renderTasks()}
                <Box sx={filterButtonContainerStyle}>
                    <Button
                        variant={'contained'}
                        size={'small'}
                        color={filter === 'all' ? 'secondary' : 'primary'}
                        onClick={() => {
                            onClickFilteredTasksHandler('all')
                        }}
                    >All</Button>
                    <Button
                        variant={'contained'}
                        size={'small'}
                        color={filter === 'active' ? 'secondary' : 'primary'}
                        onClick={() => {
                            onClickFilteredTasksHandler('active')
                        }}
                    >Active</Button>
                    <Button
                        variant={'contained'}
                        size={'small'}
                        color={filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={() => {
                            onClickFilteredTasksHandler('completed')
                        }}
                    >Completed</Button>
                </Box>
            </Box>
        </div>


    )
}