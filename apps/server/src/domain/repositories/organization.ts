import { CreateOrganizationInput } from "@dumi/zod/contracts/organization"
import { Organization } from "@dumi/zod/schemas"

export interface OrganizationRepository {
	fetchAll: OrganizationFetchAllRepository
	create: CreateOrganizationRepository
}

export type OrganizationFetchAllRepository = () => Promise<
	Organization[] | null
>

export type CreateOrganizationRepository = (
	input: CreateOrganizationInput
) => Promise<Organization | null>
