import { HttpResponse } from "@dumi/protocols"
import { CreateUserContractOutput } from "@dumi/zod/contracts/user"

export type SignupInputParams = {
	name: string
	email: string
	password: string
}

export const signup = async (
	params: SignupInputParams
): Promise<HttpResponse<CreateUserContractOutput>> => {
	const response = await fetch("/api/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(params),
	})

	if (!response.ok) {
		throw new Error("Failed to sign up")
	}

	const data = await response.json()
	return data
}
