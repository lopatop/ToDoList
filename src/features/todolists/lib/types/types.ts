
import type { Todolist } from "@/features/todolists/api/todolistsApi.types"
import {RequestStatus} from "@/common/types/types.ts";

export type DomainTodolist = Todolist & {
    filter: FilterValues
    entityStatus: RequestStatus
}

export type FilterValues = "all" | "active" | "completed"
