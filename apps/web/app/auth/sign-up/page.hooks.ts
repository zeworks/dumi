import { useMutation } from "@tanstack/react-query"
import { signup } from "@/services/signup"

export const useSignupMutation = () =>
	useMutation({
		mutationKey: ["signup"],
		mutationFn: signup,
	})
