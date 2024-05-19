import db from "../../engine/database"
import { OrganizationRepository } from "./repositories"

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
								created_at: true,
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
						created_at: true,
					},
				},
			},
		})
	},
}
