import {
	Error,
	HttpErrorResponse,
	HttpSuccessResponse,
} from "../engine/protocols"

export const ok = (data: any): HttpSuccessResponse => ({
	type: "success",
	status: 200,
	data,
})

export const serverError = (error: any): HttpErrorResponse => ({
	type: "error",
	status: 500,
	error,
})

export const badRequest = (error: Error): HttpErrorResponse => ({
	type: "error",
	status: 400,
	error,
})

export const noContent = (): HttpSuccessResponse => ({
	type: "success",
	status: 204,
	data: null,
})

export const notFound = (error: Error): HttpErrorResponse => ({
	type: "error",
	status: 404,
	error,
})

export const conflict = (error: Error): HttpErrorResponse => ({
	error,
	status: 409,
	type: "error",
})

export const unauthorized = (): HttpErrorResponse => ({
	status: 401,
	error: {
		message: "Unauthorized",
		detail: "Not authorized access",
	},
	type: "error",
})
