import { z } from "zod"

export const userStatus = z.enum(["ACTIVE", "INACTIVE", "PENDING", "BLOCKED"])

export const base = z.object({
	id: z.string().uuid(),
	created_at: z.date().default(new Date()).nullable(),
	updated_at: z.date().default(new Date()).optional().nullable(),
})

export const organization = base.merge(
	z.object({
		id: z.string().uuid().describe("organization id"),
		name: z
			.string()
			.min(3, {
				message: "Name must be at least 3 characters long",
			})
			.max(10, {
				message: "Name cannot be longer than 10 characters",
			})
			.describe("organization name"),
		avatar: z.string().optional().describe("organization avatar"),
	})
)

export const user = base.merge(
	z.object({
		id: z.string().uuid(),
		first_name: z
			.string()
			.min(4, "first_name must contain at least 4 characters"),
		last_name: z.string().optional().nullable(),
		email: z.string().email({
			message: "please enter a valid email",
		}),
		password: z
			.string()
			.min(8, "password too short (min 8 chars)")
			.optional()
			.nullable(),
		status: userStatus.default("PENDING"),
		avatar: z.string().optional().nullable(),
		access_token: z.string().optional().nullable(),
		organizations: z.array(organization).optional().nullable(),
	})
)

const userOnOrganizations = base.merge(
	z.object({
		user,
		organization,
		owner: z.boolean().default(false),
	})
)

export type Base = z.infer<typeof base>
export type Organization = z.infer<typeof organization>
export type User = z.infer<typeof user>
export type UserStatus = z.infer<typeof userStatus>
export type UserOnOrganizations = z.infer<typeof userOnOrganizations>
