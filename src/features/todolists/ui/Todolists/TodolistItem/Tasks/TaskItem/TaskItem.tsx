import ListItem from "@mui/material/ListItem"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import { deleteTasksTC, updateTaskTC } from "@/features/todolists/model/tasks-slice"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import Clear from "@mui/icons-material/Clear"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { listItemStyle } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles"
import { TaskStatus } from "@/common/enums/enums"
import { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { useAppSelector } from "@/common/hooks"
import { selectStatus } from "@/app/app-slice.ts"

type TaskProps = {
  t: DomainTask
  todolistId: string
  disabled: boolean
}

export const TaskItem = ({ disabled, t, todolistId }: TaskProps) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)

  return (
    <ListItem sx={listItemStyle}>
      <Box>
        <Checkbox
          size={"small"}
          checked={t.status === TaskStatus.Completed}
          disabled={disabled}
          onChange={(e) =>
            dispatch(
              updateTaskTC({
                todolistId,
                taskId: t.id,
                domainModel: {
                  title: t.title,
                  description: t.description,
                  status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
                  priority: t.priority,
                  startDate: t.startDate,
                  deadline: t.deadline,
                },
              }),
            )
          }
        />

        <EditableSpan
          disabled={disabled}
          isDone={t.status === TaskStatus.Completed}
          title={t.title}
          changeTitleItem={(newTitleTask) =>
            dispatch(
              updateTaskTC({
                todolistId,
                taskId: t.id,
                domainModel: {
                  title: newTitleTask,
                  description: t.description,
                  status: t.status,
                  priority: t.priority,
                  startDate: t.startDate,
                  deadline: t.deadline,
                },
              }),
            )
          }
        />
      </Box>
      <IconButton
        aria-label="delete"
        onClick={() => dispatch(deleteTasksTC({ todolistId, taskId: t.id }))}
        disabled={disabled || status === "loading"}
      >
        <Clear />
      </IconButton>
    </ListItem>
  )
}
