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

export type Error = {
	message: string
	detail?: string
}
