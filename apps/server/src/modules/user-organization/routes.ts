import { authMiddleware } from "../../engine/middlewares"
import { controllerRequestAdapter } from "../../engine/adapters"
import { AppInstance } from "../../engine/app"
import { fetchUserOrganizationsController } from "./fetch-user-organizations.controller"
import { fetchUserOrganizationsService } from "./fetch-user-organizations.service"
import { repository } from "../../repositories/user.prisma"

export default (app: AppInstance) => {
	// fetch user organizations
	app.route({
		url: "/users/:id/organizations",
		method: "GET",
		preHandler: [authMiddleware],
		handler: controllerRequestAdapter(
			fetchUserOrganizationsController(
				repository,
				fetchUserOrganizationsService
			)
		),
	})

	return app
}
