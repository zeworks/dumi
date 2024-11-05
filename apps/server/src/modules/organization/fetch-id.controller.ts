import { Organization } from "@dumi/zod/schemas"
import {
	FindOrganizationByIdRepository,
	OrganizationRepository,
} from "../../domain/repositories/organization"
import { Controller } from "../../engine/protocols"
import { badRequest, notFound, ok, serverError } from "../../helpers/http"
import { FetchOrganizationByIdService } from "../../domain/services/organization"

export const fetchOrganizationByIdController =
	(
		repository: OrganizationRepository,
		service: FetchOrganizationByIdService
	): Controller<unknown, Organization | null, { id: number }> =>
	async (request) => {
		if (!request?.params?.id)
			return badRequest({
				message: "Missing organization id!",
				detail: "Please send a valid organization id on params",
			})

		const organizationId =
			typeof request.params.id === "string"
				? parseInt(request.params.id)
				: request.params.id

		try {
			const response = await service(repository)(organizationId)

			if (!response)
				return notFound({
					message: "organization not found",
					detail: "the organization id you provided does not exist",
				})

			return ok(response)
		} catch (error) {
			return serverError(error)
		}
	}
