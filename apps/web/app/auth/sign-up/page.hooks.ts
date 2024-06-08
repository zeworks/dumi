import { useMutation } from "@tanstack/react-query"

export const useSignupMutation = () =>
	useMutation({
		mutationKey: ["signup"],
		mutationFn: async ({
			email,
			password,
			name,
		}: {
			name: string
			email: string
			password: string
		}) => {
			const response = await fetch("/api/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			})

			if (!response.ok) throw new Error("Failed to sign up")

			const data = await response.json()
			return data
		},
	})
