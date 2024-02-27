import { z } from "zod"
import { Authentication } from "../schemas/auth"

export const CREATE_AUTH_CREDENTIALS_CONTRACT = z.object({
	email: z.string(),
	password: z.string(),
})

export type CreateAuthCredentialsContract = z.infer<
	typeof CREATE_AUTH_CREDENTIALS_CONTRACT
>

export type CreateAuthServiceInput = (
	email: string,
	password: string
) => Promise<Authentication | null>
