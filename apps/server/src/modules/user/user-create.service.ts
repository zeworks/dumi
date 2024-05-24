import { encrypt } from "@dumi/crypto/encryption"
import { UserRepository } from "../../domain/repositories/user"
import { CreateUserContractInput } from "@dumi/zod/contracts/user"

export const userCreateService =
	(repository: UserRepository) => async (data: CreateUserContractInput) => {
		// fetch if there is other user with same email
		const user = await repository.fetchEmail(data.email)
		if (!!user) return null

		const password = data.password ? await encrypt(data.password) : null

		const response = await repository.create({
			...data,
			password,
		})

		return response
	}
