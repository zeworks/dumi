import { describe, test, expect } from "@jest/globals"
import UserRepositoryMemory from "./repository.memory"
import { userCreateService } from "./user-create.service"
import { userCreateController } from "./user-create.controller"

describe("create user controller", () => {
	test("it should create user with success", async () => {
		const repository = new UserRepositoryMemory()
		const userService = userCreateService(repository)

		const password = "jushr12783123"

		const user = await userCreateController(userService)({
			body: {
				email: "asdd@d.com",
				name: "jose",
				password,
				status: "PENDING",
			},
		} as any)

		expect(user.type).toBe("success")

		if (user.type === "success") {
			expect(user.data.name).toEqual("jose")
			expect(user.data.status).toEqual("PENDING")
		}
	})
})
