import { z } from "zod"
import { USER_SCHEMA } from "./user"

export const AUTHENTICATION_SCHEMA = USER_SCHEMA.merge(
	z.object({
		access_token: z.string(),
	})
)

export type Authentication = z.infer<typeof AUTHENTICATION_SCHEMA>
