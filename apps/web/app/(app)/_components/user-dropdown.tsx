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
import Link from "next/link"
import { NavLink } from "@/components/nav-link"

export function UserDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-8 w-8 select-none rounded-full bg-primary/10"
				>
					<Avatar className="h-8 w-8">
						<AvatarFallback>{["J", "D"].join("")}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-2">
						<p className="text-sm font-medium leading-none">
							{["John", "Doe"].join(" ")}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							johndoe@example.com
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
						<NavLink href="/login">Sign Out</NavLink>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
