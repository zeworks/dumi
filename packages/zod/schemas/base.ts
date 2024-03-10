import { z } from "zod"

export const baseSchema = z.object({
	id: z.string().uuid(),
	created_at: z.date().default(new Date()).nullable(),
	updated_at: z.date().default(new Date()).optional().nullable(),
})

export type Base = z.infer<typeof baseSchema>
