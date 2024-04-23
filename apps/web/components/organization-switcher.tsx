"use client"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { ComponentPropsWithoutRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Skeleton } from "./ui/skeleton"
import { Organization } from "@dumi/zod/schemas/organization"

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>
type OrganizationSwitcherProps = Pick<PopoverTriggerProps, "className"> & {
	organizations?: Organization[]
}

// TODO: review this later
export function OrganizationSwitcher({
	className,
	organizations = [],
}: OrganizationSwitcherProps) {
	const [open, setOpen] = useState(false)
	const [currentOrganization, setCurrentOrganization] =
		useState<Organization | null>(organizations[0] ?? null)

	const renderButtonContent = () => {
		const hasOrganizations = organizations?.length > 0
		const isLoading = false

		if (isLoading) {
			return (
				<>
					<Skeleton className="h-5 w-5 rounded-full bg-primary/30" />
					<Skeleton className="h-3 w-32 bg-primary/30" />
				</>
			)
		}

		if (!hasOrganizations)
			return (
				<>
					<Avatar className="h-5 w-5">
						<AvatarFallback className="text-xs">JD</AvatarFallback>
					</Avatar>
					<span className="text-xs text-muted-foreground">
						No Organizations
					</span>
					<CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
				</>
			)

		const firstChar = currentOrganization?.name?.charAt(0)
		const lastWord = currentOrganization?.name?.includes(" ")
			? currentOrganization?.name?.split(" ").pop()?.charAt(0)
			: null
		const organizationName = `${firstChar}${lastWord || ""}`

		return (
			<>
				<Avatar className="h-5 w-5">
					<AvatarImage src={currentOrganization?.avatar} />
					<AvatarFallback className="text-[10px]">
						{organizationName}
					</AvatarFallback>
				</Avatar>
				<span className="text-xs text-muted-foreground">
					{currentOrganization?.name}
				</span>
				<CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
			</>
		)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					aria-label="Select organization"
					className={cn("w-[100%] items-center gap-2", className)}
				>
					{renderButtonContent()}
					{/* {isSettingOrganization ? (
							<Loader2 className="ml-auto h-4 w-4 shrink-0 animate-spin opacity-30" />
						) : (
						)} */}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandList>
						<CommandInput placeholder="Search organization..." />
						<CommandEmpty>No organization found.</CommandEmpty>
						{!!organizations.length && (
							<CommandGroup heading="Organizations">
								{organizations?.map((organization) => (
									<CommandItem
										key={organization.id}
										onSelect={() => {
											setCurrentOrganization(organization)
											setOpen(false)
										}}
										className="gap-2"
									>
										<Avatar className="h-5 w-5">
											<AvatarImage src={organization.avatar} />
											<AvatarFallback className="text-[10px]">
												SC
											</AvatarFallback>
										</Avatar>
										<span className="text-xs text-muted-foreground">
											{organization.name}
										</span>
										{organization.id === currentOrganization?.id && (
											<CheckIcon className="ml-auto h-4 w-4" />
										)}
									</CommandItem>
								))}
							</CommandGroup>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
