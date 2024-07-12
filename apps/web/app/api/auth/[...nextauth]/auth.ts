import { AuthOptions } from "next-auth"
import env from "@dumi/env"
import db from "@/lib/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

// providers
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import {
	credentialsCallbackAdapter,
	githubCallbackAdapter,
	githubProfileProvider,
	googleCallbackAdapter,
	googleProfileProvider,
} from "./provider-adapter"
import { jwtSign, jwtVerify } from "@dumi/crypto"

export const auth: AuthOptions = {
	pages: {
		error: "/auth/error",
	},
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
	adapter: PrismaAdapter(db),
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

			const userDb = await db.user.findUnique({
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
				if (token.sub) session.user.id = token.sub
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
