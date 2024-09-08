"use client"

import { Button } from "@/components/ui/button"
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { CircleHelp, Plane, Settings, Building } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import menu from "../_data/menu"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

const OrganizationSwitcher = dynamic(() => import("./organization-switcher"), {
	ssr: false,
	loading: () => (
		<div className="flex space-x-3 items-center border-b pt-2 px-2">
			<Skeleton className="size-[36px] rounded-md bg-muted mb-2" />
		</div>
	),
})

export default function SideNav() {
	return (
		<aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
			<OrganizationSwitcher />
			<MainMenu />
			<nav className="mt-auto grid gap-1 p-2">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="mt-auto rounded-lg"
								aria-label="Help"
							>
								<Plane className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent
							side="right"
							className="max-w-[250px]"
							sideOffset={5}
						>
							<CardHeader className="p-2">
								<CardTitle>Upgrade to Pro</CardTitle>
								<CardDescription>
									Unlock all features and get unlimited access to our support
									team.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-2">
								<Button size="sm" className="w-full">
									Upgrade
								</Button>
							</CardContent>
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="mt-auto rounded-lg"
								aria-label="Help"
							>
								<CircleHelp className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							Help
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</nav>
		</aside>
	)
}

function MainMenu() {
	const pathname = usePathname()

	// validate the active menu from url pathname
	const isActiveMenuPathname = useMemo(
		() =>
			menu.find((item) => {
				// settings use case
				if (pathname === "/settings") return true

				return pathname === item.url
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[pathname]
	)

	return (
		<nav className="grid gap-1 p-2">
			{menu?.map((item) => (
				<TooltipProvider key={item.url}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link href={item.url}>
								<Button
									variant="ghost"
									size="icon"
									className={cn("rounded-lg", {
										"bg-accent text-accent-foreground border-[1px] border-foreground dark:border-none":
											isActiveMenuPathname,
									})}
									aria-label={item.label}
								>
									{<item.icon className="size-5" />}
								</Button>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							{item.label}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			))}
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="rounded-lg"
							aria-label="Settings"
						>
							<Settings className="size-5" />
						</Button>
					</TooltipTrigger>
					<TooltipContent side="right" sideOffset={5}>
						Settings
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</nav>
	)
}
