import { createAuthCredentialsController } from "./user-auth-create-credentials.controller"
import { makeCreateAuthCredentialsService } from "./user-auth-create-credentials.service-factory"

export const makeCreateAuthCredentialsController = () => {
	return createAuthCredentialsController(makeCreateAuthCredentialsService())
}
