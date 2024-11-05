import { Organization } from "@dumi/zod/schemas"
import { Controller } from "../../engine/protocols"
import { badRequest, noContent, ok, serverError } from "../../helpers/http"
import { FetchUserOrganizationsService } from "../../domain/services/user"
import { UserRepository } from "../../domain/repositories/user"

export const fetchUserOrganizationsController =
	(
		repository: UserRepository,
		service: FetchUserOrganizationsService
	): Controller<unknown, Organization[], { id: number }> =>
	async (req) => {
		if (!req?.params?.id)
			return badRequest({
				message: "missing param",
				detail: "user id is required",
			})

		const userId =
			typeof req.params.id === "string"
				? parseInt(req.params.id)
				: req.params.id

		try {
			const organizations = await service(repository)(userId)

			if (organizations === null)
				return badRequest({
					message: "invalid user",
					detail: "user is is not valid or does not exist",
				})

			if (!organizations.length) return ok([])

			return ok(organizations)
		} catch (error) {
			return serverError(error)
		}
	}
