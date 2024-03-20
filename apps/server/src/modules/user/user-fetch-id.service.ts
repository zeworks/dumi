import { UserFetchIdRepository, UserRepository } from "./repositories"

export type UserFetchIdService = UserFetchIdRepository

export const userFetchIdService =
	(repository: UserRepository): UserFetchIdRepository =>
	(id) => {
		return repository.fetchId(id)
	}
