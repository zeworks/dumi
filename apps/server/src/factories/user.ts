import { userCreateAuthCredentialsController } from "../modules/user/user-auth-create-credentials.controller"
import { userCreateAuthCredentialsService } from "../modules/user/user-auth-create-credentials.service"
import { userAuthFetchController } from "../modules/user/user-auth-fetch.controller"
import { userCreateController } from "../modules/user/user-create.controller"
import { userCreateService } from "../modules/user/user-create.service"
import { userFetchEmailService } from "../modules/user/user-fetch-email.service"
import { userFetchIdController } from "../modules/user/user-fetch-id-controller"
import { userFetchIdService } from "../modules/user/user-fetch-id.service"
import { repository } from "../repositories/user.prisma"

export const userCreateControllerFactory = () =>
	userCreateController(repository, userCreateService)

export const userFetchIdControllerFactory = () =>
	userFetchIdController(repository, userFetchIdService)

export const userFetchEmailServiceFactory = () =>
	userFetchEmailService(repository)

export const userAuthCreateCredentialsServiceFactory = () =>
	userCreateAuthCredentialsService(repository)
export const userAuthCreateCredentialsControllerFactory = () =>
	userCreateAuthCredentialsController(userAuthCreateCredentialsServiceFactory())

export const userAuthFetchControllerFactory = () =>
	userAuthFetchController(repository, userFetchEmailService)
