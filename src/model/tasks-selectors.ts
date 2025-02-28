import {RootState} from "../app/store.ts";
import {TasksPropsType} from "../app/App.tsx";




export const selectTasks = (state:RootState):TasksPropsType => state.tasks