import { Organization } from "@dumi/zod/schemas"
import {
	CreateOrganizationRepository,
	FindOrganizationByIdRepository,
	OrganizationFetchAllRepository,
	OrganizationRepository,
} from "../../domain/repositories/organization"

export class OrganizationRepositoryMemory implements OrganizationRepository {
	private organizations: Organization[] = []

	fetchAll: OrganizationFetchAllRepository = async () => {
		return this.organizations
	}

	findById: FindOrganizationByIdRepository = async (id) => {
		return this.organizations.find((o) => o.id === id) || null
	}

	create: CreateOrganizationRepository = async (data) => {
		const org: Organization = {
			id: this.organizations.length + 1,
			createdAt: new Date(),
			owner: {
				id: data.ownerId!,
				name: "owner",
				email: "owner@email.com",
				status: "ACTIVE",
			},
			...data,
		}

		this.organizations.push(org)

		return org
	}
}
