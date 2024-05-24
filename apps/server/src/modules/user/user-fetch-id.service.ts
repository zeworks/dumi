import { FetchUserIdService } from "../../domain/services/user"

export const userFetchIdService: FetchUserIdService = (repository) => (id) => {
	return repository.fetchId(id)
}
