import { TaskPriority, TaskStatus } from "@/common/enums/enums"
import { z } from "zod"
import {baseResponseSchema} from "@/common/types/types.ts";

export const domainTaskSchema = z.object({
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
export type DomainTask = z.infer<typeof domainTaskSchema>

export const getTasksSchema = z.object({
  items: domainTaskSchema.array(),
  totalCount: z.number().int().nonnegative(),
  error: z.string().nullable(),
})

export type GetTasksResponse = z.infer<typeof getTasksSchema>


export const taskOperationResponseSchema = baseResponseSchema(
    z.object({
      item: domainTaskSchema,
    })
)
export type TaskOperationResponse = z.infer<typeof taskOperationResponseSchema>


export type UpdateTaskModel = {
  title: string
  description: string | null
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
}
