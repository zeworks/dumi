"use client"

import routes from "@/config/routes"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useCallback } from "react"

const data = [
	{
		href: "general",
		name: "General",
	},
	{
		href: "settings",
		name: "Settings",
	},
]

export default function NavigationSideBar() {
	const params = useParams<{ id: string }>()
	const pathname = usePathname()
	const currentActivePath = pathname.split("/").pop()

	return (
		<nav
			className="grid gap-4 text-sm text-muted-foreground"
			x-chunk="dashboard-04-chunk-0"
		>
			{data.map((d) => {
				const active = currentActivePath === d.href

				return (
					<Link
						key={d.name}
						href={`${routes.organization.replace("{id}", params.id)}/${d.href}`}
						className={cn({
							"text-primary font-semibold": active,
						})}
					>
						{d.name}
					</Link>
				)
			})}
		</nav>
	)
}
