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
