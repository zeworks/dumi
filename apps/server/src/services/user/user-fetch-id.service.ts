import { UserFetchIdRepository, UserRepository } from "./repository"

export type UserFetchIdService = UserFetchIdRepository

export const userFetchIdService =
	(repository: UserRepository): UserFetchIdRepository =>
	(id) => {
		return repository.fetchId(id)
	}
