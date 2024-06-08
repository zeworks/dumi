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
		const validation = validateZodSchema(
			FETCH_ID_USER_CONTRACT_INPUT,
			request?.params
		)

		if (validation.type === "error") return badRequest(validation.error)

		try {
			const user = await fetchIdService(repository)(request?.params?.id!)

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
