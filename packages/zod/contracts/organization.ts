import { z } from "zod"
import { organization } from "../schemas"

export const CREATE_ORGANIZATION_INPUT = organization.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
})

export const CREATE_ORGANIZATION_OUTPUT = organization

export const UPDATE_ORGANIZATION_INPUT = z.object({
	id: z.string(),
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
