import { encrypt } from "@dumi/crypto/encryption"
import { User } from "@dumi/zod/schemas"
import {
	UserCreateRepository,
	UserFetchAllRespository,
	UserFetchEmailRepository,
	UserFetchIdRepository,
	UserRepository,
} from "./repositories"

class UserRepositoryMemory implements UserRepository {
	private users: User[]

	constructor() {
		this.users = []
	}

	create: UserCreateRepository = async (data) => {
		const id = await encrypt(data.first_name)

		const user = {
			...data,
			id,
			created_at: new Date(),
		}

		this.users.push(user)
		return Promise.resolve(user)
	}

	fetchEmail: UserFetchEmailRepository = async ({ email }) => {
		const user = this.users?.find((u) => u.email === email)
		return user || null
	}

	fetchAll: UserFetchAllRespository = () => Promise.resolve(this.users || [])

	fetchId: UserFetchIdRepository = ({ id }) => {
		const user = this.users.find((u) => u.id === id)

		if (!user) return Promise.reject("user not found")

		return Promise.resolve(user)
	}
}

export default UserRepositoryMemory
