import { z } from 'zod'

export const person = z.object({
    name: z.string(),
    age: z.number(),
    email: z.string().optional()
})

export type Person = z.infer<typeof person>