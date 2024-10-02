import { OrganizationRepository } from "../../domain/repositories/organization"
import db from "../../engine/database"

export const organizationRepository: OrganizationRepository = {
	async fetchAll() {
		return db.organization.findMany({
			include: {
				members: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
								email: true,
								avatar: true,
								status: true,
								createdAt: true,
							},
						},
					},
				},
				owner: {
					select: {
						id: true,
						name: true,
						email: true,
						avatar: true,
						status: true,
						createdAt: true,
					},
				},
			},
		})
	},

	async create(data) {
		// create the organization
		const response = await db.organization.create({
			data: {
				name: data.name,
				avatar: data.avatar,
				owner: {
					connect: {
						id: data.ownerId,
					},
				},
			},
			include: {
				owner: {
					select: {
						id: true,
						name: true,
						email: true,
						status: true,
						password: false,
					},
				},
			},
		})

		// add relation between the organization and the owner, at the members table
		await db.member.create({
			data: {
				organization: {
					connect: {
						id: response.id,
					},
				},
				user: {
					connect: {
						id: data.ownerId,
					},
				},
				role: data.role,
			},
		})

		return response
	},

	async findById(id) {
		const response = await db.organization.findFirst({
			include: {
				owner: {
					select: {
						id: true,
						avatar: true,
						name: true,
						email: true,
						status: true,
						password: false,
					},
				},
				members: {
					select: {
						id: true,
						role: true,
						user: {
							select: {
								id: true,
								avatar: true,
								name: true,
								email: true,
								status: true,
								password: false,
							},
						},
					},
				},
			},
			where: {
				id,
			},
		})

		return response
	},
}
