import { z } from "zod"
import { BASE_SCHEMA } from "./base"
import { USER_SCHEMA } from "./user"

export const ORGANIZATION_SCHEMA = BASE_SCHEMA.merge(
	z.object({
		id: z.string().uuid().describe("organization id"),
		owner: z.boolean().optional().default(false).describe("organization owner"),
		users: z.array(USER_SCHEMA).describe("organization users"),
	})
)

export type Organization = z.infer<typeof ORGANIZATION_SCHEMA>
