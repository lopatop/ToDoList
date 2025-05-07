import {baseApi} from "@/app/baseApi.ts";
import {BaseResponse} from "@/common/types";
import {InputsLoginType} from "@/features/auth/lib/schemas";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build)=>({
        me: build.query<BaseResponse<{id:number, email:string, login:string}>,void>({
            query: ()=> '/auth/me'
        }),
        login: build.mutation<BaseResponse<{userId:number, token: string}>, InputsLoginType>({
            query: (payload)=>({
                url:'/auth/login',
                method: "POST",
                body: payload,
            })
        }),
        logout: build.mutation<BaseResponse, void>({
            query:()=>({
                url:'/auth/login',
                method:"DELETE",
            })
        })
    })
})

export const {useLogoutMutation,useLoginMutation,useMeQuery} = authApi