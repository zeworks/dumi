import { describe, expect, test } from "@jest/globals"
import { UserRepositoryMemory } from "./repository.memory"
import { userCreateService } from "./user-create.service"
import { userFetchIdService } from "./user-fetch-id.service"
import { createAuthCredentialsController } from "./user-auth-create-credentials.controller"
import { createAuthCredentials } from "./user-auth-create-credentials.service"
import { userAuthenticationFetchController } from "./user-auth-fetch.controller"

describe("user auth fetch controller", () => {
	test("should fetch user auth with success", async () => {
		const repository = new UserRepositoryMemory()

		const user = await userCreateService(repository)({
			email: "john@doe.com",
			first_name: "john",
			status: "ACTIVE",
			password: "123",
		})

		if (user?.id) {
			// create session to the user
			const sessionService = createAuthCredentials(repository)
			const session = await createAuthCredentialsController(sessionService)({
				body: {
					email: user.email,
					password: "123",
				},
			} as any)

			if (session.type === "success") {
				const userAuthFetchService = userFetchIdService(repository)
				const userAuthFetchController = await userAuthenticationFetchController(
					userAuthFetchService
				)({
					_context: {
						...user,
						access_token: session.data.access_token,
					},
				} as any)

				if (userAuthFetchController.type === "success") {
					expect(userAuthFetchController.data.first_name).toEqual(
						session.data.first_name
					)
					expect(userAuthFetchController.data.access_token).toEqual(
						session.data.access_token
					)
				}
			}
		}
	})
})
