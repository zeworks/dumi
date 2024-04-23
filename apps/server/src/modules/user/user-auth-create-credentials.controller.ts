import {
	CREATE_AUTH_CREDENTIALS_CONTRACT,
	CreateAuthCredentialsContract,
	CreateAuthServiceInput,
} from "@dumi/zod/contracts/auth"
import { badRequest, ok, serverError, unauthorized } from "../../helpers/http"
import { validateZodSchema } from "../../helpers/zod"
import { Controller } from "../../engine/protocols"
import { User } from "@dumi/zod/schemas"

const validateServiceResponse = (response?: User | null) => {
	if (!response || !response?.email || response.status !== "ACTIVE")
		return unauthorized()

	return ok(response)
}

export const userCreateAuthCredentialsController =
	(
		service: CreateAuthServiceInput
	): Controller<CreateAuthCredentialsContract, User> =>
	async (request) => {
		const validation = validateZodSchema(
			CREATE_AUTH_CREDENTIALS_CONTRACT,
			request?.body
		)
		if (validation.type === "error") return badRequest(validation.error)

		return service(request?.body?.email!, request?.body?.password!)
			.then(validateServiceResponse)
			.catch(serverError)
	}
