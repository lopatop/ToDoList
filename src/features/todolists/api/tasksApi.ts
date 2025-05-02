import { instance } from "@/common/instance/instance"
import { GetTasksResponse, BaseResponse, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTasks(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskStatus(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  changeTaskTitle(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  updateTask(payload: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> }) {
    const { todolistId, taskId, domainModel } = payload
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, domainModel)
  },
}
