import {Todolist} from "@/features/todolists/api/todolistsApi.types.ts";
import {BaseResponse} from "@/common/types";
import {DomainTodolist} from "@/features/todolists/model/todolists-slice.ts";
import {baseApi} from "@/app/baseApi.ts";

export const todolistsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getTodolists: build.query<DomainTodolist[], void>({
            providesTags: ["Todolist"],
            query: () => "/todo-lists",
            transformResponse: (res: Todolist[]) => {
                return res.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            }
        }),
        changeTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
            invalidatesTags: ["Todolist"],
            query: ({id, title}) => ({
                url: `/todo-lists/${id}`,
                method: "PUT",
                body: {title}
            })
        }),
        deleteTodolist: build.mutation<BaseResponse, string>({
            invalidatesTags: ["Todolist"],
            query: (id) => ({
                url: `/todo-lists/${id}`,
                method: "DELETE"
            })
        }),
        createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
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