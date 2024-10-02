import { Organization } from "@dumi/zod/schemas"
import { OrganizationRepository } from "../repositories/organization"

export type FetchOrganizationByIdService = (
	repository: OrganizationRepository
) => (id: string) => Promise<Organization | null>
