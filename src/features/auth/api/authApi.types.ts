import {z} from "zod";
import {baseResponseSchema} from "@/common/types/types.ts";

export type meBaseResponse = {
    resultCode: number,
    messages: string[],
    data: {
        id: number,
        email: string,
        login: string,
    }
}

export const loginBaseResponseSchema = z.union([
  baseResponseSchema(z.object({
    userId: z.number().int(),
    token: z.string()
  })),
  baseResponseSchema(z.object({}))
])

export type LoginBaseResponse = z.infer<typeof loginBaseResponseSchema>

export const captchaResponseSchema = z.object({
    url: z.string()
})

export type CaptchaResponse = z.infer<typeof captchaResponseSchema>