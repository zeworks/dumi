import { makeUserFetchAllController } from "../services/user/user-fetch-all.controller-factory"
import { authMiddleware } from "./middlewares"
import t from "./trpc"

const router = t.router

/**
 * This is the main router for your app
 * It's a collection of all your endpoints
 */
export const appRouter = router({
	users: authMiddleware.query(async () => {
		return makeUserFetchAllController()()
	}),
})
