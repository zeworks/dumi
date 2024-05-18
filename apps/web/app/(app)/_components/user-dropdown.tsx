"use client"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavLink } from "@/components/nav-link"
import { useSession, signOut } from "next-auth/react"
import routes from "@/config/routes"

export function UserDropdown() {
	const { data: session } = useSession()

	const splittenName = session?.user?.name?.split(" ")
	const firstCharName = splittenName?.[0].charAt(0)
	const lastCharName = splittenName?.[splittenName?.length - 1].charAt(0)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-8 w-8 select-none rounded-full bg-primary/10"
				>
					<Avatar className="h-8 w-8">
						<AvatarImage src={session?.user?.image || ""} />
						<AvatarFallback>
							{[firstCharName, lastCharName].join("")}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-2">
						<p className="text-sm font-medium leading-none">
							{session?.user?.name}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{session?.user?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<NavLink href="/account">Account</NavLink>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<NavLink href="">My teams</NavLink>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<NavLink href="">Billing</NavLink>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<NavLink href="">API Keys</NavLink>
					</DropdownMenuItem>
					{true && (
						<DropdownMenuItem asChild>
							<NavLink href="">Settings</NavLink>
						</DropdownMenuItem>
					)}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<div onClick={() => signOut({ callbackUrl: routes.signin })}>
							Sign Out
						</div>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
