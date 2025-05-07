import {baseApi} from "@/app/baseApi.ts";
import {BaseResponse, GetTasksResponse, UpdateTaskModel} from "@/features/todolists/api/tasksApi.types.ts";

export const tasksApi = baseApi.injectEndpoints({

    endpoints: (build) => ({
        getTasks: build.query<GetTasksResponse, string>({
            providesTags: ["Task"],
            query: (todolistId) => `/todo-lists/${todolistId}/tasks`
        }),
        createTask: build.mutation<BaseResponse, { todolistId: string; title: string }>({
            invalidatesTags: ["Task"],
            query: ({todolistId, title}) => ({
                url: `/todo-lists/${todolistId}/tasks`,
                method: "POST",
                body: {title}
            })
        }),
        deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
            invalidatesTags: ["Task"],
            query: ({todolistId, taskId}) => ({
                url: `/todo-lists/${todolistId}/tasks/${taskId}`,
                method: "DELETE"
            })
        }),
        updateTask: build.mutation<BaseResponse, {
            todolistId: string;
            taskId: string;
            domainModel: Partial<UpdateTaskModel>
        }>({
            invalidatesTags: ["Task"],
            query: ({todolistId, taskId, domainModel}) => ({
                url: `/todo-lists/${todolistId}/tasks/${taskId}`,
                method: "PUT",
                body: domainModel,
            })
        })
    })
})

export const {useUpdateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useCreateTaskMutation} = tasksApi