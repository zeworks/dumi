import {
	CreateOrganizationInput,
	CreateOrganizationOutput,
} from "@dumi/zod/contracts/organization"
import { OrganizationRepository } from "../../domain/repositories/organization"

export const createOrganizationService =
	(repository: OrganizationRepository): CreateOrganizationService =>
	async (data) => {
		const response = await repository.create(data)

		if (!response) return null

		return response
	}

export type CreateOrganizationService = (
	data: CreateOrganizationInput
) => Promise<CreateOrganizationOutput | null>
