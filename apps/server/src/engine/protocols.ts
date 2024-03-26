import { FastifyRequest } from "fastify"

//#region protocol::controller
export type Controller<T = any, R = any, P = any> = (
	request?: Partial<FastifyRequest<{ Body: T; Params: P }>>
) => Promise<HttpResponse<R>>
//#endregion

//#region protocol::http
export type HttpSuccessResponse<T = any> = {
	type: "success"
	status: number
	data: T
}

export type HttpErrorResponse = {
	type: "error"
	status: number
	error: Error
}

export type HttpResponse<K = any> = HttpSuccessResponse<K> | HttpErrorResponse
//#endregion

//#region protocol::error
export type Error = {
	message: string
	detail?: string
}
//#endregion
