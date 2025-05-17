import {CreateTodolistResponse, Todolist} from "@/features/todolists/api/todolistsApi.types.ts";
import {baseApi} from "@/app/baseApi.ts";
import {DomainTodolist} from "@/features/todolists/lib/types";
import {DefaultResponse} from "@/common/types/types.ts";

export const todolistsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getTodolists: build.query<DomainTodolist[], void>({
            providesTags: ["Todolist"],
            query: () => "/todo-lists",
            transformResponse: (res: Todolist[]) => {
                return res.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            }
        }),
        changeTodolistTitle: build.mutation<DefaultResponse, { id: string; title: string }>({
            invalidatesTags: ["Todolist"],
            query: ({id, title}) => ({
                url: `/todo-lists/${id}`,
                method: "PUT",
                body: {title}
            })
        }),
        deleteTodolist: build.mutation<DefaultResponse, string>({
            invalidatesTags: ["Todolist"],
            query: (id) => ({
                url: `/todo-lists/${id}`,
                method: "DELETE"
            })
        }),
        createTodolist: build.mutation<CreateTodolistResponse, string>({
            invalidatesTags: ["Todolist"],
            query: (title) => ({
                url: `/todo-lists`,
                method: "POST",
                body: {title}
            })
        })
    })
})

export const {
    useCreateTodolistMutation,
    useDeleteTodolistMutation,
    useGetTodolistsQuery,
    useChangeTodolistTitleMutation,
} = todolistsApi