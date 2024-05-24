import { UserRepository } from "../../domain/repositories/user"
import { FetchUserEmailService } from "../../domain/services/user"

export const userFetchEmailService: FetchUserEmailService =
	(repository: UserRepository) => (email) => {
		return repository.fetchEmail(email)
	}
