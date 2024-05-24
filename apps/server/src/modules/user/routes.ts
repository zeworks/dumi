import { authMiddleware } from "../../engine/middlewares"
import { controllerRequestAdapter } from "../../engine/adapters"
import { AppInstance } from "../../engine/app"
import {
	userAuthCreateCredentialsControllerFactory,
	userAuthFetchControllerFactory,
	userCreateControllerFactory,
	userFetchIdControllerFactory,
} from "../../factories/user"

export default (app: AppInstance) => {
	// create user
	app.route({
		url: "/users",
		method: "POST",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(userCreateControllerFactory()),
	})

	// fetch user by id
	app.route({
		url: "/users/:id",
		method: "GET",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(userFetchIdControllerFactory()),
	})

	// create session
	app.route({
		url: "/session",
		method: "POST",
		handler: controllerRequestAdapter(
			userAuthCreateCredentialsControllerFactory()
		),
	})

	// fetch session
	app.route({
		url: "/session",
		method: "GET",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(userAuthFetchControllerFactory()),
	})

	return app
}
