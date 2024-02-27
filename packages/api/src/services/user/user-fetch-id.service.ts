import { UserFetchIdRepository, UserRepository } from "../../repositories/user"

export type UserFetchIdService = UserFetchIdRepository

export const userFetchIdService =
	(repository: UserRepository): UserFetchIdRepository =>
	(id) => {
		return repository.fetchId(id)
	}
