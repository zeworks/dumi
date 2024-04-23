import { z } from "zod"
import { BASE_SCHEMA } from "./base"
import { USER_SCHEMA } from "./user"

export const ORGANIZATION_SCHEMA = BASE_SCHEMA.merge(
	z.object({
		id: z.string().uuid().describe("organization id"),
		name: z
			.string()
			.min(3, {
				message: "Name must be at least 3 characters long",
			})
			.max(10, {
				message: "Name cannot be longer than 10 characters",
			})
			.describe("organization name"),
		owner: z.boolean().optional().default(false).describe("organization owner"),
		users: z.array(USER_SCHEMA).describe("organization users"),
		avatar: z.string().optional().describe("organization avatar"),
	})
)

export type Organization = z.infer<typeof ORGANIZATION_SCHEMA>
