import {baseApi} from "@/app/baseApi.ts";
import {
    GetTasksResponse, getTasksSchema,
    TaskOperationResponse, taskOperationResponseSchema,
    UpdateTaskModel
} from "@/features/todolists/api/tasksApi.types.ts";
import {DefaultResponse, defaultResponseSchema} from "@/common/types/types.ts";


export const tasksApi = baseApi.injectEndpoints({

    endpoints: (build) => ({
        getTasks: build.query<GetTasksResponse, string>({
            providesTags: ["Task"],
            query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
            extraOptions: {dataSchema: getTasksSchema},

        }),

        createTask: build.mutation<TaskOperationResponse, { todolistId: string; title: string }>({
            invalidatesTags: ["Task"],
            query: ({todolistId, title}) => ({
                url: `/todo-lists/${todolistId}/tasks`,
                method: "POST",
                body: {title}
            }),
            extraOptions: {dataSchema: taskOperationResponseSchema},
        }),
        deleteTask: build.mutation<DefaultResponse, { todolistId: string; taskId: string }>({
            invalidatesTags: ["Task"],
            query: ({todolistId, taskId}) => ({
                url: `/todo-lists/${todolistId}/tasks/${taskId}`,
                method: "DELETE"
            }),
            extraOptions: {dataSchema:defaultResponseSchema },
        }),
        updateTask: build.mutation<TaskOperationResponse, {
            todolistId: string;
            taskId: string;
            domainModel: Partial<UpdateTaskModel>
        }>({
            invalidatesTags: ["Task"],
            query: ({todolistId, taskId, domainModel}) => ({
                url: `/todo-lists/${todolistId}/tasks/${taskId}`,
                method: "PUT",
                body: domainModel,
            }),
            extraOptions: {dataSchema: taskOperationResponseSchema},
        })
    })
})

export const {useUpdateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useCreateTaskMutation} = tasksApi