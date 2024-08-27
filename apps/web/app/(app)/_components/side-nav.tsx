"use client"

import { Icons } from "@/components/icons"
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

const data = [
	{
		url: "/organizations",
		icon: <Building className="size-5" />,
		label: "Organizations",
	},
]

export default function SideNav() {
	return (
		<aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
			<Link className="border-b p-2" href="/dashboard">
				<Button variant="outline" size="icon" aria-label="Home">
					<Icons.logoSmall className="size-5 fill-foreground" />
				</Button>
			</Link>
			<MainMenu menu={data} />
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
				</TooltipProvider>
				<TooltipProvider>
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

function MainMenu({ menu }: { menu: typeof data }) {
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
									{item.icon}
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
