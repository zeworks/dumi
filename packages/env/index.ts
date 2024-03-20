import { z } from "zod"

export const envSchema = z.object({
	MODE: z.enum(["development", "production", "test"]).default("development"),
	PORT: z.string(),
	JWT_SECRET: z.string(),
	DATABASE_URL: z.string(),
})

const env = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema>

export default env
