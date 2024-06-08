"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import routes from "@/config/routes"
import { signOut } from "next-auth/react"

export function SignOutButton() {
	return (
		<DropdownMenuItem onClick={() => signOut({ callbackUrl: routes.signin })}>
			Sign Out
		</DropdownMenuItem>
	)
}
