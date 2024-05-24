import { UserRepository } from "../domain/repositories/user"
import db from "../engine/database"
import { CreateUserContractInput } from "@dumi/zod/contracts/user"

export const findUserById = (userId: string) => {
	return db.user.findUnique({
		where: { id: userId },
	})
}

const fetchUserByEmail = async (email: string) => {
	const user = await db.user.findFirst({
		where: { email },
	})
	return user
}

const create = async (data: CreateUserContractInput) => {
	const user = await db.user.create({
		data: {
			email: data.email,
			name: data.name,
			avatar: data.avatar,
			password: data.password,
			status: data.status,
		},
	})

	return user
}

export const findUserOrganizationsById = (userId: string): Promise<any> =>
	db.organization.findMany({
		where: {
			members: {
				some: {
					user: {
						id: userId,
					},
				},
			},
		},
		include: {
			members: {
				include: {
					user: {
						select: {
							id: true,
							name: true,
							avatar: true,
							email: true,
							status: true,
						},
					},
				},
			},
			owner: {
				select: {
					id: true,
					name: true,
					avatar: true,
					email: true,
					status: true,
				},
			},
		},
	})

export const repository: UserRepository = {
	fetchId: findUserById,
	fetchOrganizations: findUserOrganizationsById,
	fetchEmail: fetchUserByEmail,
	create,
}
