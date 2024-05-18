import { AuthOptions } from "next-auth"
import env from "@dumi/env"
import db from "@dumi/prisma"

// providers
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import {
	githubCallbackAdapter,
	githubProfileProvider,
	googleCallbackAdapter,
	googleProfileProvider,
} from "./provider-adapter"

export const auth: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string
					password: string
				}

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
					console.error(error)
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
	session: { strategy: "jwt" },
	secret: env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token }) {
			if (!token.sub) return token

			const userDb = await db.user.findUnique({
				where: { email: token.email! },
				select: { avatar: true, id: true },
			})

			return {
				...token,
				sub: userDb?.id,
				avatar: userDb?.avatar,
			}
		},

		async session({ session, token, user }) {
			if (session.user) {
				if (token.sub) session.user.id = token.sub
				if (token.avatar) session.user.image = token.avatar as string
			}

			return session
		},

		async signIn(params: any): Promise<any> {
			if (params.account?.provider === "github")
				return githubCallbackAdapter({
					email: params.user.email,
					name: params.user.name,
					avatar: params.user.avatar,
				})

			if (params.account?.provider === "google")
				return googleCallbackAdapter({
					email: params.user.email,
					name: params.user.name,
					avatar: params.user.image,
					is_verified: params.profile.email_verified,
				})

			return params.user
		},
	},
}
