import { userFetchAllController } from "./user-fetch-all.controller"
import { makeUserFetchAllService } from "./user-fetch-all.service-factory"

export const makeUserFetchAllController = () =>
	userFetchAllController(makeUserFetchAllService())
