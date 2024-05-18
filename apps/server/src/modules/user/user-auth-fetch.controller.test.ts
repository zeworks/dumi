import { describe, expect, test } from "@jest/globals"
import UserRepositoryMemory from "./repository.memory"
import { userCreateService } from "./user-create.service"
import { userCreateAuthCredentialsService } from "./user-auth-create-credentials.service"
import { userCreateAuthCredentialsController } from "./user-auth-create-credentials.controller"
import { userAuthFetchController } from "./user-auth-fetch.controller"
import { userFetchEmailService } from "./user-fetch-email.service"

describe("user auth fetch controller", () => {
	test("should fetch user auth with success", async () => {
		const repository = new UserRepositoryMemory()

		const user = await userCreateService(repository)({
			email: "john@doe.com",
			name: "john",
			status: "ACTIVE",
			password: "123",
		})

		if (user?.id) {
			// create session to the user
			const sessionService = userCreateAuthCredentialsService(repository)
			const session = await userCreateAuthCredentialsController(sessionService)(
				{
					body: {
						email: user.email,
						password: "123",
					},
				} as any
			)

			if (session.type === "success") {
				const authFetchService = userFetchEmailService(repository)
				const authFetchController = await userAuthFetchController(
					authFetchService
				)({
					_context: {
						...user,
						access_token: (session.data as any).access_token,
					},
				} as any)

				if (authFetchController.type === "success") {
					expect(authFetchController.data.name).toEqual(session.data.name)
					expect((authFetchController.data as any).access_token).toEqual(
						(session.data as any).access_token
					)
				}
			}
		}
	})
})
