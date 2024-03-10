import { FastifyReply, FastifyRequest } from "fastify"
import { Controller } from "./protocols"

export const controllerRequestAdapter =
	(controller: Controller) =>
	async (request: FastifyRequest<any>, reply: FastifyReply) => {
		const response = await controller(request)
		return reply.status(response.status).send(response)
	}
