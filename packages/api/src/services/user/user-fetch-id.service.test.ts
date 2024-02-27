import { describe, expect, test } from "@jest/globals"
import { UserRepositoryMemory } from "./repository.memory"
import { userCreateService } from "./user-create.service"
import { userFetchIdService } from "./user-fetch-id.service"

describe("user fetch id service", () => {
	test("should fetch user by id with success", async () => {
		const repository = new UserRepositoryMemory()

		const user = await userCreateService(repository)({
			email: "john@doe.com",
			first_name: "john",
			status: "ACTIVE",
		})

		if (user?.id) {
			const service = await userFetchIdService(repository)(user?.id)
			expect(service?.id).toEqual(user.id)
		}
	})
})
