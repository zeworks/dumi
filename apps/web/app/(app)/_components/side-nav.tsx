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
import {
	Book,
	Bot,
	CircleHelp,
	Code2,
	Plane,
	Settings,
	Building,
} from "lucide-react"

export function SideNav() {
	return (
		<aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
			<div className="border-b p-2">
				<Button variant="outline" size="icon" aria-label="Home">
					<Icons.logoSmall className="size-5 fill-foreground" />
				</Button>
			</div>
			<nav className="grid gap-1 p-2">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-lg"
								aria-label="Organizations"
							>
								<Building className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							Organizations
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-lg"
								aria-label="Models"
							>
								<Bot className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							Models
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-lg"
								aria-label="API"
							>
								<Code2 className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							API
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-lg"
								aria-label="Documentation"
							>
								<Book className="size-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={5}>
							Documentation
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
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
