import { userCreateController } from "./user-create.controller"
import { makeUserCreateService } from "./user-create.service-factory"

export const makeUserCreateController = () =>
	userCreateController(makeUserCreateService())
