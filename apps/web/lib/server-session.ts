import { nextAuthOptions } from "@dumi/auth/next"
import { getServerSession } from "next-auth"

export function getServerAuthSession() {
	return getServerSession(nextAuthOptions)
}
