import { NavLink } from "@/components/nav-link"
import { OrganizationSwitcher } from "@/components/organization-switcher"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"
import { UserDropdown } from "./user-dropdown"
import { Organization } from "@dumi/zod/schemas/organization"

const organizations: Array<Organization> = [
	{
		id: "org1",
		name: "Jose Nogueira",
		owner: false,
		users: [],
		created_at: new Date(),
	},
	{
		id: "org2",
		name: "Organization 2",
		owner: false,
		users: [],
		created_at: new Date(),
	},
]

export function Header() {
	return (
		<header className="flex py-2 items-center justify-between">
			<div className="flex w-full max-w-[190px] items-center gap-4">
				<OrganizationSwitcher organizations={organizations} />
			</div>

			<div className="flex items-center gap-4">
				<Button variant="outline" size="sm">
					Feedback
				</Button>

				<Separator orientation="vertical" className="h-5" />

				<nav className="flex items-center space-x-6">
					<NavLink className="text-xs font-normal" href="/examples/dashboard">
						Changelog
					</NavLink>
					<NavLink className="text-xs font-normal" href="/examples/dashboard">
						Help
					</NavLink>
				</nav>

				<Separator orientation="vertical" className="h-5" />

				{/* <Notifications /> */}

				<Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
					<UserDropdown />
				</Suspense>
			</div>
		</header>
	)
}
