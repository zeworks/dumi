import { TRPCError } from "@trpc/server"
import { Context } from "../engine/context"
import { verify } from "../engine/jwt"
import t from "./trpc"

export const authMiddleware = t.procedure.use((opts: any) => {
	if (!opts.ctx.user) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
		})
	}

	const token = opts.ctx.user.access_token.includes("Bearer")
		? opts.ctx.user.access_token.replace("Bearer ", "")
		: opts.ctx.user.access_token

	try {
		const jwt_decoded = verify(token) as Context

		delete (jwt_decoded as any)?.password

		opts.ctx.user = {
			...opts.ctx.user,
			...jwt_decoded,
			access_token: token,
		}

		return opts.next()
	} catch (error) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
		})
	}
})
