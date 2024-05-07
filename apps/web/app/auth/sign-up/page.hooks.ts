import { useMutation } from "@tanstack/react-query"
import {
	CreateUserContractInput,
	CreateUserContractOutput,
} from "@dumi/zod/contracts/user"

export function useSignupMutation() {
	const mutation = useMutation<
		CreateUserContractOutput,
		any,
		CreateUserContractInput
	>({
		mutationKey: ["signup"],
		mutationFn: async (user) => {
			// call signup API
			return (await fetch("/api/signup", {
				method: "POST",
				body: JSON.stringify(user),
				headers: {
					"Content-Type": "application/json",
				},
			})) as any
		},
	})

	return mutation
}
