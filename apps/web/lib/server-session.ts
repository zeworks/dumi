import { auth } from "@/app/api/auth/[...nextauth]/auth"
import { getServerSession } from "next-auth"

export function getServerAuthSession() {
	return getServerSession(auth)
}
