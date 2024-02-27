import { userCreateService } from "./user-create.service"
import { userRepository } from "./repository.prisma"

export const makeUserCreateService = () => userCreateService(userRepository)
