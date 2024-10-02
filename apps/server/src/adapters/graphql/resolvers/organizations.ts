import { GraphQLError } from "graphql"
import { fetchOrganizationByIdController } from "../../../modules/organization/fetch-id.controller"
import { fetchOrganizationByIdService } from "../../../modules/organization/fetch-id.service"
import { organizationRepository } from "../../../modules/organization/repository.prisma"

const OrganizationResolver = () => {
	const getOrganization = async (id: string) => {
		const response = await fetchOrganizationByIdController(
			organizationRepository,
			fetchOrganizationByIdService
		)({ params: { id } })

		if (response.type === "error")
			throw new GraphQLError(response.error.message)

		return response
	}

	return {
		getOrganization,
	}
}

export default OrganizationResolver
