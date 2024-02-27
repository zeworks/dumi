import { v4 } from "uuid"
import { User } from "common/lib/schemas/user"
import {
	UserCreateRepository,
	UserFetchAllRespository,
	UserFetchEmailRepository,
	UserFetchIdRepository,
	UserRepository,
} from "../../repositories/user"

export class UserRepositoryMemory implements UserRepository {
	private users: User[]

	constructor() {
		this.users = []
	}

	create: UserCreateRepository = async (data) => {
		const user = {
			...data,
			id: v4(),
			created_at: new Date(),
		}

		this.users.push(user)
		return Promise.resolve(user)
	}

	fetchEmail: UserFetchEmailRepository = async (email) => {
		const user = this.users?.find((u) => u.email === email)
		return user || null
	}

	fetchAll: UserFetchAllRespository = () => Promise.resolve(this.users || [])

	fetchId: UserFetchIdRepository = (id) => {
		const user = this.users.find((u) => u.id === id)

		if (!user) return Promise.reject("user not found")

		return Promise.resolve(user)
	}
}
