import { z } from "zod"

export const BASE_SCHEMA = z.object({
	id: z.string().uuid(),
	created_at: z.date().default(new Date()).nullable(),
	updated_at: z.date().default(new Date()).optional().nullable(),
})

export type Base = z.infer<typeof BASE_SCHEMA>
