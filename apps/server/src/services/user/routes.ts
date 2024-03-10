import { authMiddleware } from "../../engine/middlewares"
import { controllerRequestAdapter } from "../../engine/adapters"
import { AppInstance } from "../../engine/app"
import { makeUserCreateController } from "./user-create.controller-factory"
import { makeCreateAuthCredentialsController } from "./user-auth-create-credentials.controller-factory"
import { makeUserFetchAllController } from "./user-fetch-all.controller-factory"
import { makeUserAuthenticationFetchController } from "./user-auth-fetch.controller-factory"

export default (app: AppInstance) => {
	app.route({
		url: "/users",
		method: "POST",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(makeUserCreateController()),
	})

	app.route({
		url: "/users",
		method: "GET",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(makeUserFetchAllController()),
	})

	app.route({
		url: "/session",
		method: "POST",
		handler: controllerRequestAdapter(makeCreateAuthCredentialsController()),
	})

	app.route({
		url: "/session",
		method: "GET",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(makeUserAuthenticationFetchController()),
	})

	return app
}
