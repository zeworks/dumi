import { preHandlerHookHandler } from "fastify"
import { HttpErrorResponse } from "@dumi/protocols"
import { unauthorized } from "../helpers/http"
import { verify } from "@dumi/crypto/jwt"
import { User } from "@dumi/zod/schemas"

export const authMiddleware: preHandlerHookHandler = (request, reply, done) => {
	if (!request.headers.authorization)
		return reply.status(403).send({
			status: 403,
			error: {
				message: "Forbidden",
				detail: "Missing authorization header",
			},
			type: "error",
		} as HttpErrorResponse)

	const token = request.headers.authorization.includes("Bearer")
		? request.headers.authorization.replace("Bearer ", "")
		: request.headers.authorization

	try {
		const jwt_decoded = verify(token) as User

		// if user is not active, should throw unauthorized error
		if (jwt_decoded && jwt_decoded.status !== "ACTIVE")
			return reply.status(401).send(unauthorized())

		delete jwt_decoded?.password

		request._context = {
			...request._context,
			...jwt_decoded,
			access_token: token,
		}

		done()
	} catch (error) {
		return reply.status(401).send(unauthorized())
	}
}
