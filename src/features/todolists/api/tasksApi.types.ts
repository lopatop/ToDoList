import { TaskPriority, TaskStatus } from "@/common/enums/enums"

export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

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
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}
