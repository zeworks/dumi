import { encrypt } from "@dumi/crypto/encryption"
import { Organization, User } from "@dumi/zod/schemas"
import { UserRepository } from "../domain/repositories/user"

class UserRepositoryMemory implements UserRepository {
	private users: User[] = []

	constructor() {
		this.users = []
	}

	async fetchId(id: string): Promise<User | null> {
		const user = this.users?.find((u) => u.id === id)
		return user || null
	}

	async fetchEmail(email: string): Promise<User | null> {
		const user = this.users?.find((u) => u.email === email)
		return user || null
	}

	async fetchOrganizations(userId: string): Promise<Organization[]> {
		return []
	}

	async create(data: any) {
		const id = await encrypt(data.name)

		const user = {
			...data,
			id,
			createdAt: new Date(),
		}

		this.users.push(user)
		return user
	}
}

export default UserRepositoryMemory
