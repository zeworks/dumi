"use server"

import { getServerAuthSession } from "@/lib/server-session"
import { Organization } from "@dumi/zod/schemas"
import fetch from "@/lib/fetch"

export async function getUserOrganizations(
	userId?: string
): Promise<Organization[]> {
	const session = await getServerAuthSession()
	const response = await fetch<Organization[]>(
		`users/${userId || session?.user.id}/organizations`,
		{
			next: {
				revalidate: 1000 * 60 * 60, // 1 hour
			},
		}
	)

	return response.type === "success" ? response.data : []
}

export async function setCurrentOrganization(organization: Organization) {
	console.log(organization)
	return true

	// const session = await getServerAuthSession()
	// // get from the cookies
	// const currentOrganizationCookie = cookies().get(
	// 	`_current_organization-${session?.user.id}`
	// )?.value
	// console.log(currentOrganizationCookie)
	// return currentOrganizationCookie
	// 	? JSON.parse(currentOrganizationCookie)
	// 	: null
}
