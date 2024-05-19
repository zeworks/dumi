import { Organization } from "@dumi/zod/schemas"
import { OrganizationRepository } from "./repositories"

export const organizationFetchAllService = (
	organizationRepository: OrganizationRepository
): Promise<Organization[] | null> => organizationRepository.fetchAll()

export type OrganizationFetchAllService = () => Promise<Organization[] | null>
