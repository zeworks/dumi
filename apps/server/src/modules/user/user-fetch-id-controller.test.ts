import { userFetchIdController } from "./user-fetch-id-controller"
import { userFetchIdService } from "./user-fetch-id.service"
import UserRepositoryMemory from "./repository.memory"
import { expect, test, describe } from "@jest/globals"
import { Status } from "../../engine/status"
import { userCreateService } from "./user-create.service"
import { userCreateController } from "./user-create.controller"

describe("user fetch id controller", () => {
	test("Should fetch the user by id with success", async () => {
		const repository = new UserRepositoryMemory()

		// create user
		const createUserService = userCreateService(repository)
		const created_user_response = await userCreateController(createUserService)(
			{
				body: {
					email: "test@email.com",
					name: "john",
					status: "ACTIVE",
				},
			}
		)

		expect(created_user_response.type).toBe("success")
		expect(created_user_response.status).toBe(Status.Ok)

		if (created_user_response.type === "success") {
			const service = userFetchIdService(repository)
			const fetched_user_response = await userFetchIdController(service)({
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
				console.info(
					"fetched user by id controller",
					JSON.stringify(fetched_user_response)
				)
			}
		}
	})
})
