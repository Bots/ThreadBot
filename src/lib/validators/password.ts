import { z } from "zod"

export const PasswordValidator = z.object({
  password: z
    .string()
    .min(8)
    .max(64)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
})

export type UsernameRequest = z.infer<typeof PasswordValidator>
