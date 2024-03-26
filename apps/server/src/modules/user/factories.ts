import userPrismaRepository from "./repository.prisma"
import { userCreateAuthCredentialsController } from "./user-auth-create-credentials.controller"
import { userCreateAuthCredentialsService } from "./user-auth-create-credentials.service"
import { userAuthFetchController } from "./user-auth-fetch.controller"
import { userCreateController } from "./user-create.controller"
import { userCreateService } from "./user-create.service"
import { userFetchAllController } from "./user-fetch-all.controller"
import { userFetchAllService } from "./user-fetch-all.service"
import { userFetchIdController } from "./user-fetch-id-controller"
import { userFetchIdService } from "./user-fetch-id.service"

export const userCreateServiceFactory = () =>
	userCreateService(userPrismaRepository)
export const userCreateControllerFactory = () =>
	userCreateController(userCreateServiceFactory())

export const userFetchAllServiceFactory = () =>
	userFetchAllService(userPrismaRepository)
export const userFetchAllControllerFactory = () =>
	userFetchAllController(userFetchAllServiceFactory())

export const userFetchIdServiceFactory = () =>
	userFetchIdService(userPrismaRepository)
export const userFetchIdControllerFactory = () =>
	userFetchIdController(userFetchIdServiceFactory())

export const userAuthCreateCredentialsServiceFactory = () =>
	userCreateAuthCredentialsService(userPrismaRepository)
export const userAuthCreateCredentialsControllerFactory = () =>
	userCreateAuthCredentialsController(userAuthCreateCredentialsServiceFactory())

export const userAuthFetchControllerFactory = () =>
	userAuthFetchController(userFetchIdServiceFactory())
