import { PrismaClient } from "@prisma/client"
import env from "@dumi/env"
import { encrypt } from "@dumi/crypto"

const prisma = new PrismaClient()

async function main() {
	const encryptedPassword = await encrypt(env.SUPER_ADMIN_PASSWORD || "@1#ç1d")

	const user_admin = await prisma.user.create({
		data: {
			email: env.SUPER_ADMIN_EMAIL || "dumi-admin@mail.com",
			name: env.SUPER_ADMIN_NAME || "Dumi Admin",
			password: encryptedPassword,
			status: "ACTIVE",
			avatar: env.SUPER_ADMIN_AVATAR || null,
		},
	})

	const organization = await prisma.organization.create({
		data: {
			name: "Dumi Org",
			owner: {
				connect: {
					id: user_admin.id,
				},
			},
		},
	})

	const members = await prisma.member.create({
		data: {
			organization: {
				connect: {
					id: organization.id,
				},
			},
			user: {
				connect: {
					id: user_admin.id,
				},
			},
			role: "OWNER",
		},
	})

	console.log({
		user_admin,
		organization,
		members,
	})
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
	})
