import { expect, test } from "@jest/globals"
import { OrganizationRepositoryMemory } from "./repository.memory"
import { User } from "@dumi/zod/schemas"

test("should fetch all organizations", async () => {
	const repository = new OrganizationRepositoryMemory()

	const fake_user: User = {
		id: "user-1",
		name: "John Doe",
		email: "john@example.com",
		avatar: "https://example.com/avatar.png",
		status: "ACTIVE",
		createdAt: new Date(),
	}

	repository.create({
		id: "org-1",
		name: "Organization 1",
		owner: fake_user,
		members: [
			{
				id: "member-id-1",
				role: "OWNER",
				user: fake_user,
			},
		],
		createdAt: new Date(),
	})

	const response = await repository.fetchAll()
	expect(response).toHaveLength(1)
})
