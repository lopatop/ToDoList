import { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { RootState } from "@/app/store"

export const selectTodolists = (state: RootState): DomainTodolist[] => state.todolists
