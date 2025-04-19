import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(3, "Email is required").email("Incorrect email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
})

export type Inputs = z.infer<typeof loginSchema>
