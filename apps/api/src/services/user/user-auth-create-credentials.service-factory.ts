import { createAuthCredentials } from "./user-auth-create-credentials.service"
import { userRepository } from "./repository.prisma"

export const makeCreateAuthCredentialsService = () =>
	createAuthCredentials(userRepository)
