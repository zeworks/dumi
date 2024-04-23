import { z } from "zod"
import { user } from "../schemas"

export const CREATE_USER_CONTRACT_INPUT = user.omit({
	id: true,
	created_at: true,
	updated_at: true,
	organizations: true,
})

export const CREATE_USER_CONTRACT_OUTPUT = user

export const FETCH_ALL_USER_CONTRACT_OUTPUT = z.array(user)

export const FETCH_ID_USER_CONTRACT_INPUT = z.object({
	id: z.string().describe("user id"),
})

export const FETCH_ID_USER_CONTRACT_OUTPUT = user

export const FETCH_EMAIL_USER_CONTRACT_INPUT = z.object({
	email: z.string().describe("user email"),
})

export const FETCH_EMAIL_USER_CONTRACT_OUTPUT = user

export type CreateUserContractInput = z.infer<typeof CREATE_USER_CONTRACT_INPUT>
export type CreateUserContractOutput = z.infer<
	typeof CREATE_USER_CONTRACT_OUTPUT
>
export type FetchAllUserContractOutput = z.infer<
	typeof FETCH_ALL_USER_CONTRACT_OUTPUT
>
export type FetchIdUserContractInput = z.infer<
	typeof FETCH_ID_USER_CONTRACT_INPUT
>
export type FetchIdUserContractOutput = z.infer<
	typeof FETCH_ID_USER_CONTRACT_OUTPUT
>
export type FetchEmailUserContractInput = z.infer<
	typeof FETCH_EMAIL_USER_CONTRACT_INPUT
>
export type FetchEmailUserContractOutput = z.infer<
	typeof FETCH_EMAIL_USER_CONTRACT_OUTPUT
>
