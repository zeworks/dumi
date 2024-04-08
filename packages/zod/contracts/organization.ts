import { z } from "zod"
import { ORGANIZATION_SCHEMA } from "../schemas/organization"

export const CREATE_ORGANIZATION_INPUT = ORGANIZATION_SCHEMA.omit({
	id: true,
	created_at: true,
	updated_at: true,
})

export const CREATE_ORGANIZATION_OUTPUT = ORGANIZATION_SCHEMA

export const UPDATE_ORGANIZATION_INPUT = z.object({
	id: z.string(),
	organization: ORGANIZATION_SCHEMA,
})

export const UPDATE_ORGANIZATION_OUTPUT = ORGANIZATION_SCHEMA

export type CreateOrganizationInput = z.infer<typeof CREATE_ORGANIZATION_INPUT>
export type CreateOrganizationOutput = z.infer<
	typeof CREATE_ORGANIZATION_OUTPUT
>
export type UpdateOrganizationInput = z.infer<typeof UPDATE_ORGANIZATION_INPUT>
export type UpdateOrganizationOutput = z.infer<
	typeof UPDATE_ORGANIZATION_OUTPUT
>
