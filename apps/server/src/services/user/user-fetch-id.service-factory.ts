import { userRepository } from "./repository.prisma"
import { userFetchIdService } from "./user-fetch-id.service"

export const makeUserFetchIdService = () => userFetchIdService(userRepository)
