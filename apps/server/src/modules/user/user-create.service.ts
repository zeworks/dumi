import { encrypt } from "@dumi/crypto/encryption"
import { UserCreateRepository, UserRepository } from "./repositories"

export type UserCreateService = UserCreateRepository

export const userCreateService =
	(repository: UserRepository): UserCreateRepository =>
	async (input) => {
		// fetch if there is other user with same email
		const user = await repository.fetchEmail({ email: input.email })
		if (!!user) return null

		const password = input.password ? await encrypt(input.password) : null

		const response = await repository.create({
			...input,
			password,
		})

		return response
	}
