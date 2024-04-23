import { PrismaClient } from "@prisma/client"
import env from "@dumi/env"

const prisma = new PrismaClient()
async function main() {
	const user_admin = await prisma.user.create({
		data: {
			email: env.SUPER_ADMIN_EMAIL || "dumi-admin@mail.com",
			first_name: env.SUPER_ADMIN_NAME || "Dumi Admin",
			password: env.SUPER_ADMIN_PASSWORD || "@1#ç1d",
			status: "ACTIVE",
			avatar: env.SUPER_ADMIN_AVATAR || null,
		},
	})

	const organization = await prisma.organization.create({
		data: {
			name: "Dumi Org",
		},
	})

	const users_organization = await prisma.usersOnOrganizations.create({
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
			owner: true,
		},
	})

	console.log({
		user_admin,
		organization,
		users_organization,
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
