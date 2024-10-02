import { controllerRequestAdapter } from "../../engine/adapters"
import { AppInstance } from "../../engine/app"
import { authMiddleware } from "../../engine/middlewares"
import {
	createControllerFactory,
	organizationFetchAllControllerFactory,
} from "./factories"
import { fetchOrganizationByIdController } from "./fetch-id.controller"
import { fetchOrganizationByIdService } from "./fetch-id.service"
import { organizationRepository } from "./repository.prisma"

export default (app: AppInstance) => {
	// get all organizations
	app.route({
		url: "/organizations",
		method: "GET",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(organizationFetchAllControllerFactory()),
	})

	// create organization
	app.route({
		url: "/organizations",
		method: "POST",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(createControllerFactory()),
	})

	// fetch organization by id
	app.route({
		url: "/organizations/:id",
		method: "GET",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(
			fetchOrganizationByIdController(
				organizationRepository,
				fetchOrganizationByIdService
			)
		),
	})
}
