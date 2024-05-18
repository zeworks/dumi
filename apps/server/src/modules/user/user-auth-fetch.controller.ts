import { Controller } from "../../engine/protocols"
import { ok, serverError, unauthorized } from "../../helpers/http"
import { User } from "@dumi/zod/schemas"
import { UserFetchEmailService } from "./user-fetch-email.service"

export const userAuthFetchController =
	(service: UserFetchEmailService): Controller<any, User> =>
	async (request) => {
		if (!request?._context?.email) return unauthorized()

		try {
			const user = await service({
				email: request._context.email,
			})

			delete user?.password

			return ok({
				...user,
				access_token: request._context.access_token,
			})
		} catch (error) {
			return serverError(error)
		}
	}
