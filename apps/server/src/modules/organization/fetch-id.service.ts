import {
	FindOrganizationByIdRepository,
	OrganizationRepository,
} from "../../domain/repositories/organization"

export const fetchOrganizationByIdService =
	(repository: OrganizationRepository): FindOrganizationByIdRepository =>
	async (id) => {
		const response = await repository.findById(id)
		return response
	}
