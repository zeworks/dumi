import fastify, { FastifyInstance } from "fastify"

const app = fastify({
	logger: true,
})

export type AppInstance = FastifyInstance

export default app
