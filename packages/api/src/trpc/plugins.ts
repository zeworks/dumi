import { FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify"
import { createContext } from "./context"
import { appRouter } from "./routes"

/**
 * tRPC plugin for Fastify
 *
 * This plugin is used to integrate tRPC with Fastify.
 */
export const trpcPlugin = {
	prefix: "/trpc",
	trpcOptions: {
		router: appRouter,
		createContext,
		onError({ path, error }: any) {
			// report to error monitoring
			console.error(`Error in tRPC handler on path '${path}':`, error)
		},
	} satisfies FastifyTRPCPluginOptions<typeof appRouter>["trpcOptions"],
}
