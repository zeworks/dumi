import { describe, expect, test } from "vitest"
import { userCreateService } from "./user-create.service"
import { userFetchIdService } from "./user-fetch-id.service"
import UserRepositoryMemory from "../../repositories/user.memory"

describe("user fetch id service", () => {
	test("should fetch user by id with success", async () => {
		const repository = new UserRepositoryMemory()

		const user = await userCreateService(repository)({
			email: "john@doe.com",
			name: "john",
			status: "ACTIVE",
		})

		if (user?.id) {
			const service = await userFetchIdService(repository)(user?.id)
			expect(service?.id).toEqual(user.id)
		}
	})
})
