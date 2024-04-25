import NextAuth from "next-auth"
import env from "@dumi/env"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import db from "@dumi/prisma"

// providers
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const handler = NextAuth({
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date(), status: "ACTIVE" },
			})
		},
	},
	adapter: PrismaAdapter(db),
	providers: [
		GithubProvider({
			clientId: env.GITHUB_CLIENT_ID || "",
			clientSecret: env.GITHUB_CLIENT_SECRET || "",
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name,
					email: profile.email,
					avatar: profile.avatar_url,
				}
			},
		}),
	],
	session: { strategy: "jwt" },
	callbacks: {
		async jwt({ token }) {
			if (!token.sub) return token

			const user = await db.user.findFirst({
				where: { id: token.sub },
				select: { avatar: true },
			})

			return {
				...token,
				avatar: user?.avatar,
			}
		},

		async session({ session, token }) {
			if (session.user) {
				if (token.sub) session.user.id = token.sub
				if (token.avatar) session.user.image = token.avatar as string
			}

			return session
		},

		async signIn(params) {
			// we need to validate if the user already exists on database.
			// if not, we should redirect the user to the "/auth/login-callback" screen and create an account to him
			// we can know wich provider the user tryed to logged in, using params.account.provider
			// we can send some aditional parameters on the URL, like first name, last name and email
			// return `/auth/login-callback?n=${params.user.name}&e=${params.user.email}`

			// if exists, we should just log them in
			return true
		},
	},
})

export { handler as GET, handler as POST }
