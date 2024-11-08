import { z } from "zod"

export const userStatus = z.enum(["ACTIVE", "INACTIVE", "PENDING", "BLOCKED"])
export const memberRole = z.enum(["OWNER", "MEMBER", "USER"])

export const base = z.object({
	id: z.number(),
	createdAt: z.date().default(new Date()).nullable(),
	updatedAt: z.date().default(new Date()).optional().nullable(),
})

export const user = base.merge(
	z.object({
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
	id: z.number(),
	role: memberRole.default("USER"),
	user: user.pick({
		id: true,
		email: true,
		name: true,
		avatar: true,
		status: true,
	}),
})

export const organization = base.merge(
	z.object({
		name: z.string(),
		avatar: z.string().optional().nullable().describe("organization avatar"),
		owner: user.pick({
			id: true,
			avatar: true,
			email: true,
			name: true,
			status: true,
		}),
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
