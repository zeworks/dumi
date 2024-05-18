import { FastifyRequest } from "fastify"
import { HttpResponse } from "@dumi/protocols"

//#region protocol::controller
export type Controller<T = any, R = any, P = any> = (
	request?: Partial<FastifyRequest<{ Body: T; Params: P }>>
) => Promise<HttpResponse<R>>
//#endregion
