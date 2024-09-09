import { createOrganizationController } from "./create.controller"
import { createOrganizationService } from "./create.service"
import { organizationFetchAllController } from "./fetch-all.controller"
import { organizationFetchAllService } from "./fetch-all.service"
import { organizationRepository } from "./repository.prisma"

export const organizationFetchAllServiceFactory = () =>
	organizationFetchAllService(organizationRepository)

export const organizationFetchAllControllerFactory = () =>
	organizationFetchAllController(organizationFetchAllServiceFactory)

export const createService = () =>
	createOrganizationService(organizationRepository)

export const createControllerFactory = () =>
	createOrganizationController(organizationRepository, createService)
