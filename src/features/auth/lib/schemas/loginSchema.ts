import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(3, "Email is required").email("Incorrect email address"),
  password: z.string({ message: "Password is required" }).min(3, "Password must be at least 3 characters long"),
  rememberMe: z.boolean(),
})

export type Inputs = z.infer<typeof loginSchema>
