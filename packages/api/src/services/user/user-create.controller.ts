import {
	CREATE_USER_CONTRACT_INPUT,
	CreateUserContractInput,
	CreateUserContractOutput,
} from "common/lib/contracts/user"
import { Controller } from "../../engine/protocols"
import { badRequest, conflict, ok, serverError } from "../../helpers/http"
import { validateZodSchema } from "../../helpers/zod"
import { UserCreateService } from "./user-create.service"

export const userCreateController =
	(
		service: UserCreateService
	): Controller<CreateUserContractInput, CreateUserContractOutput> =>
	async (request) => {
		const validation = validateZodSchema(
			CREATE_USER_CONTRACT_INPUT,
			request?.body
		)
		if (validation.type === "error") return badRequest(validation.error)

		try {
			const user = await service(
				CREATE_USER_CONTRACT_INPUT.parse(request?.body)
			)

			if (!user?.email)
				return conflict({
					message: "Conflict when creating user",
					detail: "The user with the email provided already exists",
				})

			return ok(user)
		} catch (error) {
			return serverError(error)
		}
	}
