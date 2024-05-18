import { UserFetchEmailRepository, UserRepository } from "./repositories"

export type UserFetchEmailService = UserFetchEmailRepository

export const userFetchEmailService =
	(repository: UserRepository): UserFetchEmailRepository =>
	({ email }) => {
		return repository.fetchEmail({ email })
	}
