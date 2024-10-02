import { Organization } from "@dumi/zod/schemas"
import {
	FindOrganizationByIdRepository,
	OrganizationRepository,
} from "../../domain/repositories/organization"
import { Controller } from "../../engine/protocols"
import { badRequest, notFound, ok, serverError } from "../../helpers/http"
import { FetchOrganizationByIdService } from "../../domain/services/organization"
import { organizationRepository } from "./repository.prisma"
import { fetchOrganizationByIdService } from "./fetch-id.service"

export const fetchOrganizationByIdController =
	(
		repository: OrganizationRepository,
		service: FetchOrganizationByIdService
	): Controller<unknown, Organization | null, { id: string }> =>
	async (request) => {
		if (!request?.params?.id)
			return badRequest({
				message: "Missing organization id!",
				detail: "Please send a valid organization id on params",
			})

		try {
			const response = await service(repository)(request.params.id)

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
