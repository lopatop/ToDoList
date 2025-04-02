import { TasksPropsType } from "@/features/todolists/model/tasks-reducer.ts"
import { RootState } from "@/app/store.ts"

export const selectTasks = (state: RootState): TasksPropsType => state.tasks
