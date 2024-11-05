import { userFetchIdController } from "./user-fetch-id-controller"
import { userFetchIdService } from "./user-fetch-id.service"
import { expect, test, describe } from "vitest"
import { Status } from "../../engine/status"
import { userCreateService } from "./user-create.service"
import { userCreateController } from "./user-create.controller"
import UserRepositoryMemory from "../../repositories/user.memory"

describe("user fetch id controller", () => {
	test("Should fetch the user by id with success", async () => {
		const repository = new UserRepositoryMemory()

		// create user
		const created_user_response = await userCreateController(
			repository,
			userCreateService
		)({
			body: {
				email: "test@email.com",
				name: "john",
				status: "ACTIVE",
			},
		})

		expect(created_user_response.type).toBe("success")
		expect(created_user_response.status).toBe(Status.Ok)

		if (created_user_response.type === "success") {
			const fetched_user_response = await userFetchIdController(
				repository,
				userFetchIdService
			)({
				params: {
					id: created_user_response.data.id,
				},
			})

			expect(fetched_user_response.type).toEqual("success")
			expect(fetched_user_response.status).toEqual(Status.Ok)

			if (fetched_user_response.type === "success") {
				expect(fetched_user_response.data?.id).toEqual(
					created_user_response.data.id
				)
				expect(fetched_user_response.data?.status).toEqual("ACTIVE")
			}
		}
	})
})
