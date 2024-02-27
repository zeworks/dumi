import { Controller } from "../../engine/protocols"
import { ok, serverError } from "../../helpers/http"
import { UserFetchAllService } from "./user-fetch-all.service"

export const userFetchAllController =
	(userFetchAllService: UserFetchAllService): Controller =>
	async () => {
		try {
			const users = await userFetchAllService()
			return ok(users)
		} catch (error) {
			return serverError(error)
		}
	}
