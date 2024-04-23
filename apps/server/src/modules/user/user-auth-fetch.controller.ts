import { Controller } from "../../engine/protocols"
import { UserFetchIdService } from "./user-fetch-id.service"
import { ok, serverError, unauthorized } from "../../helpers/http"
import { User } from "@dumi/zod/schemas"

export const userAuthFetchController =
	(service: UserFetchIdService): Controller<any, User> =>
	async (request) => {
		if (!request?._context?.id) return unauthorized()

		try {
			const user = await service(request._context.id)

			return ok({
				...user,
				access_token: request._context.access_token,
			})
		} catch (error) {
			return serverError(error)
		}
	}
