import { jwtSign } from "@dumi/crypto"
import { decrypt } from "@dumi/crypto/encryption"
import { UserRepository } from "./repositories"

export const userCreateAuthCredentialsService =
	(repository: UserRepository) => async (email: string, password: string) => {
		const user = await repository.fetchEmail(email)

		if (!user) return null

		const validatePassword = await decrypt(password, user?.password || "")

		if (!validatePassword) return null

		const token = jwtSign(user)

		// hide from response the user's password
		delete user.password

		return {
			...user,
			access_token: token,
		}
	}
