import { expect, test } from "vitest"
import { OrganizationRepositoryMemory } from "./repository.memory"
import { User } from "@dumi/zod/schemas"

test("should fetch all organizations", async () => {
	const repository = new OrganizationRepositoryMemory()

	const fake_user: User = {
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		avatar: "https://example.com/avatar.png",
		status: "ACTIVE",
		createdAt: new Date(),
	}

	repository.create({
		name: "Organization 1",
		ownerId: fake_user.id,
	})

	const response = await repository.fetchAll()
	expect(response).toHaveLength(1)
})
