import ListItem from "@mui/material/ListItem"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import Clear from "@mui/icons-material/Clear"
import {TaskStatus} from "@/common/enums/enums"
import {useAppSelector} from "@/common/hooks"
import {selectStatus} from "@/app/app-slice.ts"
import {useDeleteTaskMutation, useUpdateTaskMutation} from "@/features/todolists/api/tasksApi.ts";
import {ChangeEvent} from "react";
import {DomainTask, UpdateTaskModel} from "@/features/todolists/api";
import {listItemStyle, taskInfoBoxStyle, taskTitleBoxStyle, wrapperBoxStyle} from "./TaskItem.styles";
import {EditableSpan} from "@/common/components";

type TaskProps = {
    t: DomainTask
    todolistId: string
}

export const TaskItem = ({t, todolistId}: TaskProps) => {
    const [deleteTask, {isLoading}] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const status = useAppSelector(selectStatus)



    const updateTaskModel = (updatedFields: Partial<UpdateTaskModel>) => {
        const model: UpdateTaskModel = {
            description: t.description,
            title: t.title,
            priority: t.priority,
            startDate: t.startDate,
            deadline: t.deadline,
            status: t.status,

            ...updatedFields
        }
        updateTask({todolistId, taskId: t.id, domainModel: model});
    };


    const deleteTaskHandler = () => {
        deleteTask({todolistId, taskId: t.id})
    }
    const updateStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        updateTaskModel({status})
    }
    const updateTitleTask = (newTitleTask: string) => {
        updateTaskModel({title: newTitleTask})
    }


    return (
        <ListItem sx={listItemStyle}>
          <Box sx={wrapperBoxStyle}>
            <Box sx={taskInfoBoxStyle}>
              <Checkbox
                size="small"
                checked={t.status === TaskStatus.Completed}
                disabled={isLoading}
                onChange={updateStatusTask}
              />
              <Box
                sx={taskTitleBoxStyle}
              >
                <EditableSpan
                  isDone={t.status === TaskStatus.Completed}
                  title={t.title}
                  changeTitleItem={updateTitleTask}
                />
              </Box>
            </Box>
            <IconButton
              aria-label="delete"
              onClick={deleteTaskHandler}
              disabled={status === "loading"}
            >
              <Clear />
            </IconButton>
          </Box>
        </ListItem>
    )
}
