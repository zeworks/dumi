import { Organization } from "@dumi/zod/schemas"

export type OrganizationRepository = {
	fetchAll: OrganizationFetchAllRepository
}

export type OrganizationFetchAllRepository = () => Promise<
	Organization[] | null
>
