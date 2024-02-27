import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import app from "./engine/app"
import env from "./engine/env"
import setupRoutes from "./routes"
import userModuleRoutes from "./services/user/routes"
import { trpcPlugin } from "./trpc/plugins"

app.register(fastifyTRPCPlugin, trpcPlugin)

setupRoutes(app)([userModuleRoutes]).listen(
	{
		port: Number(env.PORT),
	},
	() => console.log("🚀 Server is up and running!")
)
