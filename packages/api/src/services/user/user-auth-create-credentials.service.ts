import { UserRepository } from "../../repositories/user"
import { sign } from "../../engine/jwt"
import { decrypt } from "../../engine/encryption"

export const createAuthCredentials =
	(repository: UserRepository) => async (email: string, password: string) => {
		const user = await repository.fetchEmail(email)

		if (!user) return null

		const validatePassword = await decrypt(password, user?.password || "")

		if (!validatePassword) return null

		const token = sign(user)

		// hide from response the user's password
		delete user.password

		return {
			...user,
			access_token: token,
		}
	}
