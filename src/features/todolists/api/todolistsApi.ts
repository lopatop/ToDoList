import {
    CreateTodolistResponse,
    createTodolistResponseSchema,
    Todolist
} from "@/features/todolists/api/todolistsApi.types.ts";
import {baseApi} from "@/app/baseApi.ts";
import {DomainTodolist} from "@/features/todolists/lib/types";
import {DefaultResponse, defaultResponseSchema} from "@/common/types";

export const todolistsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getTodolists: build.query<DomainTodolist[], void>({
            providesTags: ["Todolist"],
            query: () => "/todo-lists",
            transformResponse: (res: Todolist[]) => {
                return res.map(tl => ({...tl, filter: 'all'}))
            }
        }),

        changeTodolistTitle: build.mutation<DefaultResponse, { id: string; title: string }>({
            invalidatesTags: ["Todolist"],
            query: ({id, title}) => ({
                url: `/todo-lists/${id}`,
                method: "PUT",
                body: {title}
            }),
            extraOptions: {dataSchema: defaultResponseSchema},
        }),
        deleteTodolist: build.mutation<DefaultResponse, string>({
            invalidatesTags: ["Todolist"],
            query: (id) => ({
                url: `/todo-lists/${id}`,
                method: "DELETE"
            }),
            extraOptions: {dataSchema: defaultResponseSchema},
            async onQueryStarted(id: string, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
                        const index = state.findIndex(todolist => todolist.id === id)
                        if (index !== -1) {
                            state.splice(index, 1)
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
        createTodolist: build.mutation<CreateTodolistResponse, string>({
            invalidatesTags: ["Todolist"],
            query: (title) => ({
                url: `/todo-lists`,
                method: "POST",
                body: {title}
            }),
            extraOptions: {dataSchema: createTodolistResponseSchema},
        })

    })
})

export const {
    useCreateTodolistMutation,
    useDeleteTodolistMutation,
    useGetTodolistsQuery,
    useChangeTodolistTitleMutation,
} = todolistsApi