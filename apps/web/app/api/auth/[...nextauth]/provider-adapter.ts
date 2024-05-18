import db from "@dumi/prisma"
import { User } from "next-auth"

type GitHubAdapterInput = {
	name: string
	email: string
	avatar?: string
}

type GoogleAdapterInput = {
	name: string
	email: string
	avatar?: string
	is_verified: boolean
}

type ProviderAdapterOutput = User | string | undefined

export const githubCallbackAdapter = async ({
	email,
	name,
	avatar,
}: GitHubAdapterInput): Promise<ProviderAdapterOutput> => {
	try {
		const user = await db.user.findUnique({
			where: { email: email! },
		})

		if (user && user.status !== "ACTIVE") {
			return "/auth/account-inactive"
		}

		// if the user exists, we should log them in
		if (user) {
			return {
				...user,
				image: user.avatar || avatar,
			}
		}

		const newUser = await db.user.create({
			data: {
				name: name!,
				email: email!,
				emailVerified: new Date(),
				status: "ACTIVE",
				avatar: avatar,
			},
		})

		if (newUser) {
			return {
				...newUser,
				image: newUser.avatar,
			}
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const googleCallbackAdapter = async ({
	email,
	name,
	avatar,
	is_verified,
}: GoogleAdapterInput): Promise<ProviderAdapterOutput> => {
	try {
		if (!is_verified) throw new Error("Your google account is not verified")

		const userDatabase = await db.user.findUnique({
			where: { email: email! },
		})

		if (userDatabase && userDatabase.status !== "ACTIVE") {
			throw new Error("user is not active")
		}

		// if the user exists, we should log them in
		if (userDatabase) {
			return {
				...userDatabase,
				image: userDatabase.avatar || avatar,
			}
		}

		const newUser = await db.user.create({
			data: {
				name: name!,
				email: email!,
				emailVerified: new Date(),
				status: "ACTIVE",
				avatar: avatar,
			},
		})

		if (newUser) {
			return {
				...newUser,
				image: newUser.avatar,
			}
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const githubProfileProvider = (profile: any) => ({
	id: profile.id,
	name: profile.name,
	email: profile.email,
	avatar: profile.avatar_url,
})

export const googleProfileProvider = (profile: any) => ({
	id: profile.id || profile.sub,
	name: profile.name,
	email: profile.email,
	image: profile.picture,
	avatar: profile.picture,
})
