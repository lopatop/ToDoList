import ListItem from "@mui/material/ListItem"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import { changeIsDoneTaskAC, removeTaskAC, removeTitleTaskAC } from "@/features/todolists/model/tasks-reducer.ts"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import Clear from "@mui/icons-material/Clear"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { TaskType } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { listItemStyle } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts"

type TaskProps = {
  t: TaskType
  todolistId: string
}

export const TaskItem = ({ t, todolistId }: TaskProps) => {
  const dispatch = useAppDispatch()

  return (
    <ListItem sx={listItemStyle}>
      <Box>
        <Checkbox
          size={"small"}
          checked={t.isDone}
          onChange={(e) =>
            dispatch(
              changeIsDoneTaskAC({
                todolistId,
                isDone: e.currentTarget.checked,
                taskId: t.id,
              }),
            )
          }
        />
        <EditableSpan
          isDone={t.isDone}
          title={t.title}
          changeTitleItem={(newTitleTask) =>
            dispatch(
              removeTitleTaskAC({
                todolistId,
                newTitle: newTitleTask,
                taskId: t.id,
              }),
            )
          }
        />
      </Box>
      <IconButton aria-label="delete" onClick={() => dispatch(removeTaskAC({ todolistId, taskId: t.id }))}>
        <Clear />
      </IconButton>
    </ListItem>
  )
}
