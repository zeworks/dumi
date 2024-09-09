import {
	CREATE_ORGANIZATION_INPUT,
	CreateOrganizationInput,
	CreateOrganizationOutput,
} from "@dumi/zod/contracts/organization"
import { Controller } from "../../engine/protocols"
import { validateZodSchema } from "../../helpers/zod"
import { badRequest, ok, serverError } from "../../helpers/http"
import { OrganizationRepository } from "../../domain/repositories/organization"
import { createOrganizationService } from "./create.service"

export const createOrganizationController =
	(
		repository: OrganizationRepository,
		service: typeof createOrganizationService
	): Controller<CreateOrganizationInput, CreateOrganizationOutput> =>
	async (request) => {
		const validation = validateZodSchema(
			CREATE_ORGANIZATION_INPUT,
			request?.body
		)
		if (validation.type === "error") return badRequest(validation.error)

		try {
			const output = await service(repository)(
				CREATE_ORGANIZATION_INPUT.parse(request?.body)
			)

			return ok(output)
		} catch (error) {
			return serverError(error)
		}
	}
