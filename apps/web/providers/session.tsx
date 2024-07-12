"use client"
import { Session } from "next-auth"
import {
	SessionProvider as NextAuthSessionProvider,
	SessionContext,
} from "next-auth/react"
import { useContext } from "react"

export const SessionProvider = ({
	children,
	session,
}: {
	children: React.ReactNode
	session: Session | null
}) => {
	return (
		<NextAuthSessionProvider refetchOnWindowFocus session={session}>
			{children}
		</NextAuthSessionProvider>
	)
}

export const useSession = () => {
	const context = useContext(SessionContext)

	if (!context)
		throw new Error("useSession must be used within a SessionProvider")

	return context
}
