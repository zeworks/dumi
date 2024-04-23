import { z } from "zod"

export const envSchema = z.object({
	MODE: z.enum(["development", "production", "test"]).default("development"),
	SERVER_PORT: z.string(),
	WEB_PORT: z.string(),
	JWT_SECRET: z.string(),
	DATABASE_URL: z.string(),

	// super admin configuration
	SUPER_ADMIN_EMAIL: z.string(),
	SUPER_ADMIN_PASSWORD: z.string(),
	SUPER_ADMIN_NAME: z.string(),
	SUPER_ADMIN_AVATAR: z.string().optional(),
})

const env = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema>

export default env
