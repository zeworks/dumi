import { encrypt } from "@dumi/crypto/encryption"
import { UserCreateRepository, UserRepository } from "./repository"

export type UserCreateService = UserCreateRepository

export const userCreateService =
	(repository: UserRepository): UserCreateRepository =>
	async (input) => {
		// fetch if there is other user with same email
		const user = await repository.fetchEmail(input.email)
		if (!!user) return null

		const password = input.password ? await encrypt(input.password) : ""

		const response = await repository.create({
			...input,
			password,
		})

		return response
	}
