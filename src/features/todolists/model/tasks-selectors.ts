import { TasksPropsType } from "@/features/todolists/model/tasks-slice"
import { RootState } from "@/app/store"

export const selectTasks = (state: RootState): TasksPropsType => state.tasks
