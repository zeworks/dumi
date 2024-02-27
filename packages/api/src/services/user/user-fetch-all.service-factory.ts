import { userFetchAllService } from "./user-fetch-all.service"
import { userRepository } from "./repository.prisma"

export const makeUserFetchAllService = () => userFetchAllService(userRepository)
