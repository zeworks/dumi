import db from "../../engine/database"
import { UserRepository } from "./repository"

export const userRepository: UserRepository = {
	create: async (data) => {
		const user = await db.user.create({
			data: {
				email: data.email,
				first_name: data.first_name,
				last_name: data.last_name,
				avatar: data.avatar,
				password: data.password,
				status: data.status,
			},
		})

		return user
	},

	fetchEmail: async (email) => {
		const user = await db.user.findFirst({
			where: { email },
		})
		return user
	},

	fetchAll: async () => {
		return db.user.findMany()
	},

	fetchId: (id) => db.user.findUnique({ where: { id } }),
}
