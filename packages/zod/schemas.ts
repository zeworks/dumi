import { z } from "zod"

export const userStatus = z.enum(["ACTIVE", "INACTIVE", "PENDING", "BLOCKED"])
export const memberRole = z.enum(["OWNER", "MEMBER", "USER"])

export const base = z.object({
	id: z.string().uuid(),
	createdAt: z.date().default(new Date()).nullable(),
	updatedAt: z.date().default(new Date()).optional().nullable(),
})

export const user = base.merge(
	z.object({
		id: z.string().uuid(),
		name: z.string().min(4, "name must contain at least 4 characters"),
		email: z.string().email({
			message: "please enter a valid email",
		}),
		email_verified: z.date().optional().nullable(),
		password: z
			.string()
			.min(8, "password too short (min 8 chars)")
			.optional()
			.nullable(),
		status: userStatus.default("PENDING"),
		avatar: z.string().optional().nullable(),
	})
)

const member = z.object({
	id: z.string().uuid(),
	role: memberRole.default("USER"),
	user,
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
		avatar: z.string().optional().nullable().describe("organization avatar"),
		owner: user,
		members: z
			.array(member)
			.optional()
			.nullable()
			.describe("organization members"),
	})
)

export type Base = z.infer<typeof base>

export type User = z.infer<typeof user>
export type UserStatus = z.infer<typeof userStatus>

export type Member = z.infer<typeof member>
export type MemberRole = z.infer<typeof memberRole>

export type Organization = z.infer<typeof organization>
