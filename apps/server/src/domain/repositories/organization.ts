import { Organization } from "@dumi/zod/schemas"
import { CreateOrganizationInput } from "@dumi/zod/contracts/organization"

export interface OrganizationRepository {
	fetchAll: OrganizationFetchAllRepository
	create: CreateOrganizationRepository
	findById: FindOrganizationByIdRepository
}

export type OrganizationFetchAllRepository = () => Promise<
	Organization[] | null
>

export type CreateOrganizationRepository = (
	input: CreateOrganizationInput
) => Promise<Organization | null>

export type FindOrganizationByIdRepository = (
	id: number
) => Promise<Organization | null>
