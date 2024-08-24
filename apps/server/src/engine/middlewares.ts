import { preHandlerHookHandler } from "fastify"
import { HttpErrorResponse } from "@dumi/protocols"
import { unauthorized } from "../helpers/http"
import { verify } from "@dumi/crypto/jwt"
import { User } from "@dumi/zod/schemas"
import { userFetchIdControllerFactory } from "../factories/user"

export const authMiddleware: preHandlerHookHandler = async (
	request,
	reply,
	done
) => {
	const authorizationToken = request.headers?.authorization

	if (!authorizationToken)
		return reply.status(403).send({
			status: 403,
			error: {
				message: "Forbidden",
				detail: "Missing authorization header",
			},
			type: "error",
		} as HttpErrorResponse)

	const token = authorizationToken.includes("Bearer")
		? authorizationToken.replace("Bearer ", "")
		: authorizationToken

	try {
		const jwt_decoded = verify(token) as User

		if (!jwt_decoded)
			return reply.status(401).send({
				status: 401,
				error: {
					message: "Unauthorized",
					detail: "Your token is invalid",
				},
				type: "error",
			} as HttpErrorResponse)

		const user = await userFetchIdControllerFactory()({
			params: { id: jwt_decoded.id },
		})

		if (user.type === "error") {
			return reply.status(user.status).send(user)
		}

		// if user is not active, should throw unauthorized error
		if (
			jwt_decoded &&
			(jwt_decoded.status !== "ACTIVE" || user?.data?.status !== "ACTIVE")
		)
			return reply.status(401).send({
				status: 401,
				error: {
					message: "Unauthorized",
					detail: "Your account is not active",
				},
				type: "error",
			} as HttpErrorResponse)

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
