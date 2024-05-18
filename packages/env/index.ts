import { z } from "zod"

export const envSchema = z.object({
	MODE: z.enum(["development", "production", "test"]).default("development"),
	SERVER_PORT: z.string(),
	WEB_PORT: z.string(),
	JWT_SECRET: z.string().optional(),
	DATABASE_URL: z.string().optional(),

	// super admin configuration
	SUPER_ADMIN_EMAIL: z.string().optional(),
	SUPER_ADMIN_PASSWORD: z.string().optional(),
	SUPER_ADMIN_NAME: z.string().optional(),
	SUPER_ADMIN_AVATAR: z.string().optional(),

	// Authentication Providers
	NEXTAPI_URL: z.string().optional(),
	NEXTAUTH_SECRET: z.string().optional(),
	NEXTAUTH_URL: z.string().optional(),
	GITHUB_CLIENT_ID: z.string().optional(),
	GITHUB_CLIENT_SECRET: z.string().optional(),
	GOOGLE_CLIENT_ID: z.string().optional(),
	GOOGLE_CLIENT_SECRET: z.string().optional(),
})

const env = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema>

export default env
