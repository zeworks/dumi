import app from "./engine/app"
import env from "@dumi/env"
import setupRoutes from "./routes"
import userModuleRoutes from "./modules/user/routes"

setupRoutes(app)([userModuleRoutes]).listen(
	{
		port: Number(env.PORT),
	},
	() => console.log("🚀 Server is up and running!")
)
