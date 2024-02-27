import { appRouter } from "./trpc/routes"

/**
 * This is the main router for your app
 * It's a collection of all your endpoints
 */
export type AppRouter = typeof appRouter
