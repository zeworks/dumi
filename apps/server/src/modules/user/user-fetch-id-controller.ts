import {
	FETCH_ID_USER_CONTRACT_INPUT,
	FetchIdUserContractInput,
	FetchIdUserContractOutput,
} from "@dumi/zod/contracts/user"
import { Controller } from "../../engine/protocols"
import { badRequest, notFound, ok, serverError } from "../../helpers/http"
import { validateZodSchema } from "../../helpers/zod"
import { UserRepository } from "../../domain/repositories/user"
import { FetchUserIdService } from "../../domain/services/user"

export const userFetchIdController =
	(
		repository: UserRepository,
		fetchIdService: FetchUserIdService
	): Controller<any, FetchIdUserContractOutput, FetchIdUserContractInput> =>
	async (request) => {
		if (!request?.params?.id)
			return badRequest({
				message: "Missing user id!",
				detail: "Please provide user id",
			})

		const validation = validateZodSchema(
			FETCH_ID_USER_CONTRACT_INPUT,
			request?.params
		)

		if (validation.type === "error") return badRequest(validation.error)

		const userId =
			typeof request.params.id === "string"
				? parseInt(request.params.id)
				: request.params.id

		try {
			const user = await fetchIdService(repository)(userId)

			if (!user)
				return notFound({
					message: "user not found",
					detail: "this user id is invalid or the user does not exist",
				})

			return ok(user)
		} catch (error) {
			return serverError(error)
		}
	}
