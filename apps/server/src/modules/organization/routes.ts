import { controllerRequestAdapter } from "../../engine/adapters"
import { AppInstance } from "../../engine/app"
import { authMiddleware } from "../../engine/middlewares"
import {
	createControllerFactory,
	organizationFetchAllControllerFactory,
} from "./factories"

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
}
