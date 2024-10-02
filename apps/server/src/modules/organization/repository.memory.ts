import { Organization } from "@dumi/zod/schemas"
import {
	CreateOrganizationRepository,
	FindOrganizationByIdRepository,
	OrganizationFetchAllRepository,
	OrganizationRepository,
} from "../../domain/repositories/organization"

export class OrganizationRepositoryMemory
	implements Partial<OrganizationRepository>
{
	private organizations: Organization[] = []

	fetchAll: OrganizationFetchAllRepository = async () => {
		return this.organizations
	}

	findById?: FindOrganizationByIdRepository | undefined = async (id) => {
		return this.organizations.find((o) => o.id === id) || null
	}
}
