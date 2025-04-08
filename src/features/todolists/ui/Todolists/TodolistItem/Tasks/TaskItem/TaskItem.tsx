import ListItem from "@mui/material/ListItem"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import { changeTaskStatusTC, changeTaskTitleTC, deleteTasksTC } from "@/features/todolists/model/tasks-slice.ts"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import Clear from "@mui/icons-material/Clear"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { listItemStyle } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"

type TaskProps = {
  t: DomainTask
  todolistId: string
}

export const TaskItem = ({ t, todolistId }: TaskProps) => {
  const dispatch = useAppDispatch()

  return (
    <ListItem sx={listItemStyle}>
      <Box>
        <Checkbox
          size={"small"}
          checked={t.status === TaskStatus.Completed}
          onChange={(e) =>
            dispatch(
              changeTaskStatusTC({
                todolistId,
                status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
                task: t,
              }),
            )
          }
        />
        <EditableSpan
          isDone={t.status === TaskStatus.Completed}
          title={t.title}
          changeTitleItem={(newTitleTask) =>
            dispatch(
              changeTaskTitleTC({
                todolistId,
                title: newTitleTask,
                taskId: t.id,
              }),
            )
          }
        />
      </Box>
      <IconButton aria-label="delete" onClick={() => dispatch(deleteTasksTC({ todolistId, taskId: t.id }))}>
        <Clear />
      </IconButton>
    </ListItem>
  )
}
