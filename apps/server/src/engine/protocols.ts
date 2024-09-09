import { FastifyRequest } from "fastify"
import { HttpResponse } from "@dumi/protocols"

//#region protocol::controller
export type Controller<Variables = any, Response = any, Params = any> = (
	request?: Partial<FastifyRequest<{ Body: Variables; Params: Params }>>
) => Promise<HttpResponse<Response>>
//#endregion
