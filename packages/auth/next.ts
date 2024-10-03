import { AuthOptions, User } from "next-auth"
import env from "@dumi/env"
import client from "@dumi/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtSign, jwtVerify } from "@dumi/crypto"
import NextAuth from "next-auth/next"

type ProviderAdapterOutput = User | string | undefined

export const githubCallbackAdapter = async (
	params: any
): Promise<ProviderAdapterOutput> => {
	const { account, user, profile } = params

	try {
		// Check if there is an existing account with the provider and providerAccountId
		const existingAccount = await client.account.findUnique({
			where: {
				provider_providerAccountId: {
					provider: account.provider,
					providerAccountId: account.providerAccountId,
				},
			},
		})

		const existingUser = await client.user.findUnique({
			where: { email: user.email! },
		})

		if (existingUser && existingUser.status !== "ACTIVE") {
			return "/auth/account-inactive"
		}

		if (existingUser) {
			if (!existingAccount) {
				await client.account.create({
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

		const newUser = await client.user.create({
			data: {
				name: user.name!,
				email: user.email!,
				emailVerified: new Date(),
				status: "ACTIVE",
				avatar: user.avatar,
			},
		})

		await client.account.create({
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
		const existingAccount = await client.account.findUnique({
			where: {
				provider_providerAccountId: {
					provider: account.provider,
					providerAccountId: account.providerAccountId,
				},
			},
		})

		const existingUser = await client.user.findUnique({
			where: { email: user.email! },
		})

		if (existingUser && existingUser.status !== "ACTIVE") {
			return "/auth/account-inactive"
		}

		// if the user exists, we should log them in
		if (existingUser) {
			if (!existingAccount) {
				await client.account.create({
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

		const newUser = await client.user.create({
			data: {
				name: user.name!,
				email: user.email!,
				emailVerified: new Date(),
				status: "ACTIVE",
				avatar: user.image,
			},
		})

		await client.account.create({
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
		const existingAccount = await client.account.findUnique({
			where: {
				provider_providerAccountId: {
					provider: account.provider,
					providerAccountId: account.providerAccountId,
				},
			},
		})

		// if the user exists, we should log them in
		if (!existingAccount) {
			await client.account.create({
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

export const nextAuthOptions: AuthOptions = {
	pages: {
		error: "/auth/error",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {},
			async authorize(credentials) {
				try {
					// call the service to create authentication
					const response = await fetch(`${env.NEXTAPI_URL}/session`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(credentials),
					})

					if (!response.ok) {
						throw new Error("Invalid email or password")
					}

					const data = await response.json()

					if (data.type === "success") return data.data
				} catch (error) {
					throw error
				}
			},
		}),
		GithubProvider({
			clientId: env.GITHUB_CLIENT_ID || "",
			clientSecret: env.GITHUB_CLIENT_SECRET || "",
			profile: githubProfileProvider,
		}),
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID || "",
			clientSecret: env.GOOGLE_CLIENT_SECRET || "",
			profile: googleProfileProvider,
		}),
	],
	adapter: PrismaAdapter(client),
	session: { strategy: "jwt" },
	secret: env.NEXTAUTH_SECRET,
	jwt: {
		async encode(params: any): Promise<string> {
			return jwtSign({
				id: params.token.id,
				sub: params.token.id,
				name: params.token.name,
				email: params.token.email,
				avatar: params.token.avatar,
				status: params.token.status,
				iat: Math.floor(Date.now() / 1000), // Issue at time
			})
		},
		async decode(params: any): Promise<any> {
			return jwtVerify(params.token)
		},
	},
	callbacks: {
		async jwt({ token }) {
			if (!token.sub || !!token.id) return token

			const userDb = await client.user.findUnique({
				where: { email: token.email! },
				select: { avatar: true, id: true, status: true },
			})

			return {
				...token,
				id: userDb?.id,
				sub: userDb?.id,
				avatar: userDb?.avatar,
				status: userDb?.status,
			}
		},

		async session({ session, token, user }) {
			if (session.user) {
				if (token.sub) (session.user as any).id = token.sub
				if (token.avatar) session.user.image = token.avatar as string
			}

			return session
		},

		async signIn(params: any): Promise<any> {
			if (params.account?.provider === "github")
				return githubCallbackAdapter(params)

			if (params.account?.provider === "google")
				return googleCallbackAdapter(params)

			return credentialsCallbackAdapter(params)
		},
	},
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
