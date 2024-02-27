import { Controller } from "../../engine/protocols"
import { UserFetchIdService } from "./user-fetch-id.service"
import { ok, serverError, unauthorized } from "../../helpers/http"
import { Authentication } from "common/lib/schemas/auth"

export const userAuthenticationFetchController =
	(service: UserFetchIdService): Controller<any, Authentication> =>
	async (request) => {
		if (!request?._context?.id) return unauthorized()

		try {
			const user = await service(request._context.id)

			delete user?.password

			return ok({
				...user,
				access_token: request._context.access_token,
			})
		} catch (error) {
			return serverError(error)
		}
	}
