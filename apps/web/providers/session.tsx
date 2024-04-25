"use client"
import { Session } from "next-auth"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

export const SessionProvider = ({
	children,
	session,
}: {
	children: React.ReactNode
	session: Session | null
}) => {
	return (
		<NextAuthSessionProvider session={session}>
			{children}
		</NextAuthSessionProvider>
	)
}
