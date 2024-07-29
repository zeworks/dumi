import { controllerRequestAdapter } from "../../engine/adapters"
import { AppInstance } from "../../engine/app"
import { authMiddleware } from "../../engine/middlewares"
import { organizationFetchAllControllerFactory } from "./factories"

export default (app: AppInstance) => {
	// get all organizations
	app.route({
		url: "/organizations",
		method: "GET",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(organizationFetchAllControllerFactory()),
	})
}
