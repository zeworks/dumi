import app from "./engine/app"
import env from "@dumi/env"
import setupRoutes from "./routes"
import userModuleRoutes from "./modules/user/routes"
import organizationModuleRoutes from "./modules/organization/routes"
import userOrganizationModuleRoutes from "./modules/user-organization/routes"

setupRoutes(app)([
	userModuleRoutes,
	organizationModuleRoutes,
	userOrganizationModuleRoutes,
]).listen(
	{
		port: Number(env.SERVER_PORT),
	},
	() => console.log(`🚀 Server is up and running on ${env.SERVER_PORT}!`)
)
