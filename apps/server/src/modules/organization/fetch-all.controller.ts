import { Organization } from "@dumi/zod/schemas"
import { Controller } from "../../engine/protocols"
import { OrganizationFetchAllService } from "./fetch-all.service"
import { ok, serverError } from "../../helpers/http"

export const organizationFetchAllController =
	(
		service: OrganizationFetchAllService
	): Controller<unknown, Organization[] | null> =>
	async () => {
		try {
			const response = await service()
			return ok(response)
		} catch (error) {
			return serverError(error)
		}
	}
