import { Error, HttpErrorResponse, HttpSuccessResponse } from "@dumi/protocols"
import { Status } from "../engine/status"

export const ok = (data: any): HttpSuccessResponse => ({
	type: "success",
	status: Status.Ok,
	data,
})

export const serverError = (error: any): HttpErrorResponse => ({
	type: "error",
	status: Status.ServerError,
	error,
})

export const badRequest = (error: Error): HttpErrorResponse => ({
	type: "error",
	status: Status.BadRequest,
	error,
})

export const noContent = (): HttpSuccessResponse => ({
	type: "success",
	status: Status.NoContent,
	data: null,
})

export const notFound = (error: Error): HttpErrorResponse => ({
	type: "error",
	status: Status.NotFound,
	error,
})

export const conflict = (error: Error): HttpErrorResponse => ({
	error,
	status: Status.Conflict,
	type: "error",
})

export const unauthorized = (): HttpErrorResponse => ({
	status: Status.Unauthorized,
	error: {
		message: "Unauthorized",
		detail: "Not authorized access",
	},
	type: "error",
})
