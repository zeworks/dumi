"use server"
import { Organization } from "@dumi/zod/schemas"
import fetch from "@/lib/fetch"
import {
	CreateOrganizationInput,
	CreateOrganizationOutput,
} from "@dumi/zod/contracts/organization"
import { getServerAuthSession } from "@/lib/server-session"

export async function createOrganization(
	data: CreateOrganizationInput
): Promise<CreateOrganizationOutput> {
	const session = await getServerAuthSession()

	try {
		const response = await fetch<Organization>(`organizations`, {
			body: JSON.stringify({
				name: data.name,
				ownerId: session?.user.id,
				role: data.role,
			} as CreateOrganizationInput),
			method: "POST",
		})

		if (response.type === "error") throw response.error

		return response.data
	} catch (error) {
		console.log("error on create organization", error)
		throw error
	}
}
