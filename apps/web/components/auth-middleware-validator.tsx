"use client"

import routes from "@/config/routes"
import { useSession } from "@/providers/session"
import { useRouter } from "next/navigation"

export default function AuthMiddlewareValidator({
	children,
}: {
	children: React.ReactNode
}) {
	const session = useSession()
	const router = useRouter()

	if (session.status === "unauthenticated") router.replace(routes.signin)

	return <>{children}</>
}
