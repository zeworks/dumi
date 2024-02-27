import { z } from "zod"
import { USER_SCHEMA } from "../schemas/user"

export const CREATE_USER_CONTRACT_INPUT = USER_SCHEMA.omit({
	id: true,
	created_at: true,
	updated_at: true,
})

export const CREATE_USER_CONTRACT_OUTPUT = USER_SCHEMA.omit({
	password: true,
})

export const FETCH_ALL_USER_CONTRACT_OUTPUT = z.array(USER_SCHEMA)

export type CreateUserContractInput = z.infer<typeof CREATE_USER_CONTRACT_INPUT>
export type CreateUserContractOutput = z.infer<
	typeof CREATE_USER_CONTRACT_OUTPUT
>
export type FetchAllUserContractOutput = z.infer<
	typeof FETCH_ALL_USER_CONTRACT_OUTPUT
>
