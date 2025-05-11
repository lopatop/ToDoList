import {z} from "zod";
import {ResultCode} from "@/common/enums";


export const FieldErrorSchema = z.object({
    error: z.string(),
    field: z.string()
})


export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
    z.object({
        data: schema,
        messages: z.string().array(),
        fieldsErrors: FieldErrorSchema.array(),
        resultCode: z.nativeEnum(ResultCode),
    })



export const defaultResponseSchema = baseResponseSchema(z.object({}))

export type DefaultResponse = z.infer<typeof defaultResponseSchema>

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
