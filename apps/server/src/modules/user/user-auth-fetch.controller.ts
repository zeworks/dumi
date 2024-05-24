import { UserRepository } from "../../domain/repositories/user"
import { FetchUserEmailService } from "../../domain/services/user"
import { Controller } from "../../engine/protocols"
import { ok, serverError, unauthorized } from "../../helpers/http"
import { User } from "@dumi/zod/schemas"

export const userAuthFetchController =
	(
		repository: UserRepository,
		service: FetchUserEmailService
	): Controller<any, User> =>
	async (request) => {
		if (!request?._context?.email) return unauthorized()

		try {
			const user = await service(repository)(request._context.email)

			delete user?.password

			return ok({
				...user,
				access_token: request._context.access_token,
			})
		} catch (error) {
			return serverError(error)
		}
	}
