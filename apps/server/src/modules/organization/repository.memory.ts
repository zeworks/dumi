import { Organization } from "@dumi/zod/schemas"
import {
	OrganizationFetchAllRepository,
	OrganizationRepository,
} from "./repositories"

export class OrganizationRepositoryMemory implements OrganizationRepository {
	private organizations: Organization[] = []

	fetchAll: OrganizationFetchAllRepository = async () => {
		return this.organizations
	}

	async create(organization: Organization): Promise<Organization> {
		this.organizations.push(organization)
		return organization
	}
}
