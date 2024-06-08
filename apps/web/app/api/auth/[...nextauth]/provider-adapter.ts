import db from "@/lib/db"
import { User } from "next-auth"

type ProviderAdapterOutput = User | string | undefined

export const githubCallbackAdapter = async (
	params: any
): Promise<ProviderAdapterOutput> => {
	const { account, user, profile } = params

	try {
		// Check if there is an existing account with the provider and providerAccountId
		const existingAccount = await db.account.findUnique({
			where: {
				provider_providerAccountId: {
					provider: account.provider,
					providerAccountId: account.providerAccountId,
				},
			},
		})

		const existingUser = await db.user.findUnique({
			where: { email: user.email! },
		})

		if (existingUser && existingUser.status !== "ACTIVE") {
			return "/auth/account-inactive"
		}

		if (existingUser) {
			if (!existingAccount) {
				await db.account.create({
					data: {
						userId: existingUser.id,
						provider: account.provider,
						providerAccountId: account.providerAccountId,
						accessToken: account.access_token,
						refreshToken: account.refresh_token,
						accessTokenExpires: account.expires_at
							? new Date(account.expires_at * 1000)
							: null,
						tokenType: account.token_type,
						idToken: account.id_token,
						scope: account.scope,
						sessionState: account.session_state,
					},
				})
			}

			return {
				...existingUser,
				image: existingUser.avatar || user?.image,
			}
		}

		const newUser = await db.user.create({
			data: {
				name: user.name!,
				email: user.email!,
				emailVerified: new Date(),
				status: "ACTIVE",
				avatar: user.avatar,
			},
		})

		await db.account.create({
			data: {
				userId: newUser.id,
				provider: account.provider,
				providerAccountId: account.providerAccountId,
				accessToken: account.accessToken,
				refreshToken: account.refreshToken,
				accessTokenExpires: account.expires_at
					? new Date(account.expires_at * 1000)
					: null,
				tokenType: account.token_type,
				idToken: account.id_token,
				scope: account.scope,
				sessionState: account.session_state,
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

export const googleCallbackAdapter = async (
	params: any
): Promise<ProviderAdapterOutput> => {
	const { account, user, profile } = params

	try {
		if (!profile?.email_verified)
			throw new Error("Your google account is not verified")

		// Check if there is an existing account with the provider and providerAccountId
		const existingAccount = await db.account.findUnique({
			where: {
				provider_providerAccountId: {
					provider: account.provider,
					providerAccountId: account.providerAccountId,
				},
			},
		})

		const existingUser = await db.user.findUnique({
			where: { email: user.email! },
		})

		if (existingUser && existingUser.status !== "ACTIVE") {
			return "/auth/account-inactive"
		}

		// if the user exists, we should log them in
		if (existingUser) {
			if (!existingAccount) {
				await db.account.create({
					data: {
						userId: existingUser!.id,
						provider: account.provider,
						providerAccountId: account.providerAccountId,
						accessToken: account.accessToken,
						refreshToken: account.refreshToken,
						accessTokenExpires: account.expires_at
							? new Date(account.expires_at * 1000)
							: null,
						tokenType: account.token_type,
						idToken: account.id_token,
						scope: account.scope,
						sessionState: account.session_state,
					},
				})
			}
			return {
				...existingUser,
				image: existingUser.avatar || user?.image,
			}
		}

		const newUser = await db.user.create({
			data: {
				name: user.name!,
				email: user.email!,
				emailVerified: new Date(),
				status: "ACTIVE",
				avatar: user.image,
			},
		})

		await db.account.create({
			data: {
				userId: newUser.id,
				provider: account.provider,
				providerAccountId: account.providerAccountId,
				accessToken: account.accessToken,
				refreshToken: account.refreshToken,
				accessTokenExpires: account.expires_at
					? new Date(account.expires_at * 1000)
					: null,
				tokenType: account.token_type,
				idToken: account.id_token,
				scope: account.scope,
				sessionState: account.session_state,
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

export const credentialsCallbackAdapter = async (params: any) => {
	const { account, user } = params

	try {
		if (user.status !== "ACTIVE") return "/auth/account-inactive"

		// Check if there is an existing account with the provider and providerAccountId
		const existingAccount = await db.account.findUnique({
			where: {
				provider_providerAccountId: {
					provider: account.provider,
					providerAccountId: account.providerAccountId,
				},
			},
		})

		// if the user exists, we should log them in
		if (!existingAccount) {
			await db.account.create({
				data: {
					userId: user!.id,
					provider: account.provider,
					providerAccountId: account.providerAccountId,
					accessToken: account.accessToken,
					refreshToken: account.refreshToken,
					accessTokenExpires: account.expires_at
						? new Date(account.expires_at * 1000)
						: null,
					tokenType: account.token_type,
					idToken: account.id_token,
					scope: account.scope,
					sessionState: account.session_state,
				},
			})
		}

		return {
			...user,
			image: user.avatar,
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const githubProfileProvider = (profile: any) => {
	return {
		id: profile.id,
		name: profile.name,
		email: profile.email,
		avatar: profile.avatar_url,
	}
}

export const googleProfileProvider = (profile: any) => ({
	id: profile.id || profile.sub,
	name: profile.name,
	email: profile.email,
	image: profile.picture,
	avatar: profile.picture,
})
