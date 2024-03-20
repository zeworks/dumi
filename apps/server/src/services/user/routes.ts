import { authMiddleware } from "../../engine/middlewares"
import { controllerRequestAdapter } from "../../engine/adapters"
import { AppInstance } from "../../engine/app"
import {
	userAuthCreateCredentialsControllerFactory,
	userAuthFetchControllerFactory,
	userCreateControllerFactory,
	userFetchAllControllerFactory,
} from "./factories"

export default (app: AppInstance) => {
	app.route({
		url: "/users",
		method: "POST",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(userCreateControllerFactory()),
	})

	app.route({
		url: "/users",
		method: "GET",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(userFetchAllControllerFactory()),
	})

	app.route({
		url: "/session",
		method: "POST",
		handler: controllerRequestAdapter(
			userAuthCreateCredentialsControllerFactory()
		),
	})

	app.route({
		url: "/session",
		method: "GET",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(userAuthFetchControllerFactory()),
	})

	return app
}
