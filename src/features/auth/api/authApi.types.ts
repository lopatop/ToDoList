import {string, z} from "zod";
import {baseResponseSchema} from "@/common/types/types.ts";


// export const meBaseResponseSchema = baseResponseSchema(z.object({
//     id: z.number().int(),
//     email: z.string().email(),
//     login: z.string(),
// }))


export type meBaseResponse = {
    resultCode: number,
    messages: string[],
    data: {
        id: number,
        email: string,
        login: string,
    }
}

export const loginBaseResponseSchema = baseResponseSchema(z.object({
    userId: z.number().int(),
    token: string()
}))

export type LoginBaseResponse = z.infer<typeof loginBaseResponseSchema>