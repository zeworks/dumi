import {
	UserFetchAllRespository,
	UserRepository,
} from "../../repositories/user"
import { User } from "common/lib/schemas/user"

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
