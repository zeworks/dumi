import { FastifyReply, FastifyRequest } from "fastify"
import { Controller } from "./protocols"
import { Status } from "./status"
import { serverError } from "../helpers/http"

export const controllerRequestAdapter =
	(controller: Controller) =>
	async (request: FastifyRequest<any>, reply: FastifyReply) => {
		try {
			const response = await controller(request)
			if (!reply.sent) reply.status(response.status).send(response)
		} catch (error) {
			// Handle unexpected errors
			reply.status(Status.ServerError).send(serverError(error))
		}
	}
