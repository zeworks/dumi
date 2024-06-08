import { FetchUserOrganizationsService } from "../../domain/services/user"

export const fetchUserOrganizationsService: FetchUserOrganizationsService =
	(repository) => async (userId) => {
		const isValidUser = await repository.fetchId(userId)

		if (!isValidUser) return null

		return repository.fetchOrganizations(userId)
	}
