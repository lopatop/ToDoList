import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AUTH_TOKEN} from "@/common/constant";
import {baseQueryWithZodValidation, handleError} from "@/common/utils";


export const baseApi = createApi({
    reducerPath: "todolistsApi",
    tagTypes: ["Todolist", "Task"],
    baseQuery:
        baseQueryWithZodValidation(async (args, api, extraOptions) => {
            // Имитация задержки всех запросов на 3 секунды
            // await new Promise((resolve) => setTimeout(resolve, 3000));

            const result = await fetchBaseQuery({

                baseUrl: import.meta.env.VITE_BASE_URL,
                prepareHeaders: (headers) => {
                    headers.set("API-KEY", import.meta.env.VITE_API_KEY)
                    headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
                    return headers
                },

            })(args, api, extraOptions)

            handleError(api, result)
            return result

        },),


    endpoints: () => ({}),
})
