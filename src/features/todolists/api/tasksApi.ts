import {baseApi} from "@/app/baseApi.ts";
import {
    GetTasksResponse, getTasksSchema,
    TaskOperationResponse, taskOperationResponseSchema,
    UpdateTaskModel
} from "@/features/todolists/api/tasksApi.types.ts";
import {COUNT_SIZE} from "@/common/constant";
import {DefaultResponse, defaultResponseSchema} from "@/common/types";


export const tasksApi = baseApi.injectEndpoints({

    endpoints: (build) => ({
        getTasks: build.query<GetTasksResponse, {
            todolistId:string, params:{page: number}
        } >({
            query: ({todolistId,params}) => ({
                url:`/todo-lists/${todolistId}/tasks`,
                params:{...params, count: COUNT_SIZE}
            }),
            providesTags: (_result, _error, {todolistId}) => [{ type: 'Task', id: todolistId }],
            extraOptions: {dataSchema: getTasksSchema},

        }),

        createTask: build.mutation<TaskOperationResponse, { todolistId: string; title: string }>({
            invalidatesTags: (_result, _error, {todolistId})=>[{ type: 'Task', id: todolistId }],
            query: ({todolistId, title}) => ({
                url: `/todo-lists/${todolistId}/tasks`,
                method: "POST",
                body: {title}
            }),
            extraOptions: {dataSchema: taskOperationResponseSchema},
        }),
        deleteTask: build.mutation<DefaultResponse, { todolistId: string; taskId: string }>({
            invalidatesTags: (_result, _error, {todolistId})=>[{ type: 'Task', id: todolistId }],
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
            query: ({todolistId, taskId, domainModel}) => ({
                url: `/todo-lists/${todolistId}/tasks/${taskId}`,
                method: "PUT",
                body: domainModel,
            }),
            async onQueryStarted({ todolistId, taskId, domainModel }, { dispatch, queryFulfilled, getState }) {
                const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks')

                let patchResults: any[] = []
                cachedArgsForQuery.forEach(({params}) => {
                    patchResults.push(
                        dispatch(
                            tasksApi.util.updateQueryData(
                                'getTasks',
                                {todolistId, params: {page: params.page}},
                                state => {
                                    const index = state.items.findIndex(task => task.id === taskId)
                                    if (index !== -1) {
                                        state.items[index] = {...state.items[index], ...domainModel}
                                    }
                                }
                            )
                        )
                    )
                })
                try {
                    await queryFulfilled
                } catch {
                    patchResults.forEach(patchResult => {
                        patchResult.undo()
                    })
                }
            },
            invalidatesTags: (_result, _error, {todolistId})=>[{ type: 'Task', id: todolistId }],
            extraOptions: {dataSchema: taskOperationResponseSchema},
        })
    })
})

export const {useUpdateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useCreateTaskMutation} = tasksApi