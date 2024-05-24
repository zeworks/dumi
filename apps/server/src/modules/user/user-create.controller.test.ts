import { describe, test, expect } from "@jest/globals"
import { userCreateService } from "./user-create.service"
import { userCreateController } from "./user-create.controller"
import UserRepositoryMemory from "../../repositories/user.memory"

describe("create user controller", () => {
	test("it should create user with success", async () => {
		const repository = new UserRepositoryMemory()

		const password = "jushr12783123"

		const user = await userCreateController(
			repository,
			userCreateService
		)({
			body: {
				email: "asdd@d.com",
				name: "jose",
				password,
				status: "PENDING",
			},
		})

		expect(user.type).toBe("success")

		if (user.type === "success") {
			expect(user.data.name).toEqual("jose")
			expect(user.data.status).toEqual("PENDING")
		}
	})
})
