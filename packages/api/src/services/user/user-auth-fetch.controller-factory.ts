import { userAuthenticationFetchController } from "./user-auth-fetch.controller"
import { makeUserFetchIdService } from "./user-fetch-id.service-factory"

export const makeUserAuthenticationFetchController = () =>
	userAuthenticationFetchController(makeUserFetchIdService())
