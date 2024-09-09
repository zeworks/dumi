import { Organization } from "@dumi/zod/schemas"
import {
	CreateOrganizationRepository,
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
}
