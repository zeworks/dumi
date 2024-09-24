import { NavLink } from "@/components/nav-link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import React, { Suspense } from "react"
import { UserDropdown } from "./user-dropdown"
import { ThemeSwitcher } from "./theme-switcher"
import OrganizationDropdown from "./organization-dropdown"

export function Header() {
	return (
		<header className="flex py-2 items-center justify-between">
			<div>
				<OrganizationDropdown />
			</div>
			<div className="flex items-center gap-4">
				<ThemeSwitcher />

				<Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
					<UserDropdown />
				</Suspense>
			</div>
		</header>
	)
}
