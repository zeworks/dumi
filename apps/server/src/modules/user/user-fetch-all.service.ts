import { User } from "@dumi/zod/schemas/user"
import { UserFetchAllRespository, UserRepository } from "./repositories"

export type UserFetchAllService = () => Promise<Array<User>>

export const userFetchAllService =
	(repository: UserRepository): UserFetchAllRespository =>
	async () => {
		const users = await repository.fetchAll()

		return users.map((u) => {
			// hide the user's password from response
			delete u.password
			return u
		})
	}
