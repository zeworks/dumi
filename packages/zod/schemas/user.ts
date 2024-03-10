import { z } from "zod"
import { baseSchema } from "./base"

export const STATUS_SCHEMA = z.enum([
	"ACTIVE",
	"INACTIVE",
	"PENDING",
	"BLOCKED",
])

export const USER_SCHEMA = baseSchema.merge(
	z.object({
		id: z.string().uuid(),
		first_name: z
			.string()
			.min(4, "first_name must contain at least 4 characters"),
		last_name: z.string().optional().nullable(),
		email: z.string().email({
			message: "please enter a valid email",
		}),
		password: z
			.string()
			.min(8, "password too short (min 8 chars)")
			.optional()
			.nullable(),
		status: STATUS_SCHEMA.default("PENDING"),
		avatar: z.string().optional().nullable(),
		access_token: z.string().optional().nullable(),
	})
)

export type User = z.infer<typeof USER_SCHEMA>
export type Status = z.infer<typeof STATUS_SCHEMA>
