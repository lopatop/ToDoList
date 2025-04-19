import { TaskPriority, TaskStatus } from "@/common/enums/enums"
import { z } from "zod"

export const DomainTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.string().datetime({ local: true }),
})
export type DomainTask = z.infer<typeof DomainTaskSchema>

export type GetTasksResponse = {
  items: DomainTask[]
  totalCount: number
  error: string | null
}

export type BaseResponse = {
  data: { item: DomainTask }
  resultCode: number
  messages: string[]
}

export type UpdateTaskModel = {
  title: string
  description: string | null
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
}
