import { z } from "zod"
import { memberRole, organization } from "../schemas"

export const CREATE_ORGANIZATION_INPUT = z.object({
	name: z
		.string()
		.min(3, {
			message: "Name must be at least 3 characters long",
		})
		.max(10, {
			message: "Name cannot be longer than 10 characters",
		})
		.describe("organization name"),
	ownerId: z.number().optional().describe("owner id"),
	avatar: z.string().optional().describe("organization avatar"),
})

export const CREATE_ORGANIZATION_OUTPUT = organization

export const UPDATE_ORGANIZATION_INPUT = z.object({
	id: z.number(),
	organization,
})

export const UPDATE_ORGANIZATION_OUTPUT = organization

export type CreateOrganizationInput = z.infer<typeof CREATE_ORGANIZATION_INPUT>
export type CreateOrganizationOutput = z.infer<
	typeof CREATE_ORGANIZATION_OUTPUT
>
export type UpdateOrganizationInput = z.infer<typeof UPDATE_ORGANIZATION_INPUT>
export type UpdateOrganizationOutput = z.infer<
	typeof UPDATE_ORGANIZATION_OUTPUT
>
