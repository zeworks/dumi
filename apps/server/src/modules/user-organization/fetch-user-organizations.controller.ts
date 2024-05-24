import { Organization } from "@dumi/zod/schemas"
import { Controller } from "../../engine/protocols"
import { badRequest, noContent, ok, serverError } from "../../helpers/http"
import { FetchUserOrganizationsService } from "../../domain/services/user"
import { UserRepository } from "../../domain/repositories/user"

export const fetchUserOrganizationsController =
	(
		repository: UserRepository,
		service: FetchUserOrganizationsService
	): Controller<unknown, Organization[], { id: string }> =>
	async (req) => {
		if (!req?.params?.id)
			return badRequest({
				message: "missing param",
				detail: "user id is required",
			})

		try {
			const organizations = await service(repository)(req.params.id)

			if (organizations === null)
				return badRequest({
					message: "invalid user",
					detail: "user is is not valid or does not exist",
				})

			if (!organizations.length) return noContent()

			return ok(organizations)
		} catch (error) {
			return serverError(error)
		}
	}
