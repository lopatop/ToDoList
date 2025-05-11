import { z } from "zod"
import {baseResponseSchema} from "@/common/types/types.ts";


export type Todolist = z.infer<typeof todolistSchema>

export const todolistSchema = z.object({
  addedDate: z.string().datetime({ local: true }),
  id: z.string(),
  order: z.number(),
  title: z.string(),
})

export const createTodolistResponseSchema = baseResponseSchema(
    z.object({
      item:todolistSchema
    })
)

export type CreateTodolistResponse = z.infer<typeof createTodolistResponseSchema>