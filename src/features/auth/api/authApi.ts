import {baseApi} from "@/app/baseApi.ts";
import {InputsLoginType} from "@/features/auth/lib/schemas";
import {
    CaptchaResponse, captchaResponseSchema,
    LoginBaseResponse,
    loginBaseResponseSchema, meBaseResponse,
} from "@/features/auth/api/authApi.types.ts";
import {DefaultResponse, defaultResponseSchema} from "@/common/types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build)=>({
        me: build.query<meBaseResponse,void>({
            query: ()=> '/auth/me',

        }),
        login: build.mutation<LoginBaseResponse, InputsLoginType>({
            query: (payload)=>({
                url:'/auth/login',
                method: "POST",
                body: payload,
            }),
            extraOptions: {dataSchema: loginBaseResponseSchema},
        }),
        logout: build.mutation<DefaultResponse, void>({
            query:()=>({
                url:'/auth/login',
                method:"DELETE",
            }),
            extraOptions: {dataSchema: defaultResponseSchema},
        }),
        captcha: build.query<CaptchaResponse,void>({
            query:()=>'/security/get-captcha-url',
            extraOptions: {dataSchema: captchaResponseSchema },
        })
    })
})

export const {useLogoutMutation,useLoginMutation,useMeQuery, useCaptchaQuery} = authApi