"use client"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { ComponentPropsWithoutRef, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../../../components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../components/ui/popover"
import { Skeleton } from "../../../components/ui/skeleton"
import { Organization } from "@dumi/zod/schemas"
import { useOrganizationsContext } from "../_providers/organizations"

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>
type OrganizationSwitcherProps = Pick<PopoverTriggerProps, "className">

function CommandOrganization({
	organization,
	onSelect,
	active = false,
}: {
	organization: Organization
	onSelect: (organization: Organization) => void
	active: boolean
}) {
	const firstChar = organization?.name?.charAt(0)
	const lastWord = organization?.name?.includes(" ")
		? organization?.name?.split(" ").pop()?.charAt(0)
		: ""
	const organizationName = `${firstChar}${lastWord}`

	return (
		<CommandItem
			key={organization.id}
			onSelect={() => onSelect(organization)}
			className="gap-2"
		>
			<Avatar className="h-5 w-5">
				<AvatarImage src={organization?.avatar || ""} />
				<AvatarFallback className="text-[10px]">
					{organizationName}
				</AvatarFallback>
			</Avatar>
			<span className="text-xs text-muted-foreground">{organization.name}</span>
			{active && <CheckIcon className="ml-auto h-4 w-4" />}
		</CommandItem>
	)
}

export function OrganizationSwitcher({ className }: OrganizationSwitcherProps) {
	const {
		organizations,
		isLoading,
		currentOrganization: currentOrganizationContext,
		setCurrentOrganization,
	} = useOrganizationsContext()

	const [open, setOpen] = useState(false)

	const currentOrganization = useMemo(
		() => organizations?.find((o) => o.id === currentOrganizationContext),
		[organizations, currentOrganizationContext]
	)

	const renderButtonContent = useMemo(() => {
		if (isLoading) {
			return (
				<>
					<Skeleton className="h-5 w-5 rounded-full bg-primary/30" />
					<Skeleton className="h-3 w-32 bg-primary/30" />
				</>
			)
		}

		if (!currentOrganization)
			return (
				<>
					<Avatar className="h-5 w-5">
						<AvatarFallback className="text-[10px]"></AvatarFallback>
					</Avatar>
					<span className="text-xs text-muted-foreground">
						Select Organization
					</span>
					<CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
				</>
			)

		const firstChar = currentOrganization?.name?.charAt(0)
		const lastWord = currentOrganization?.name?.includes(" ")
			? currentOrganization?.name?.split(" ").pop()?.charAt(0)
			: ""
		const organizationName = `${firstChar}${lastWord}`

		return (
			<>
				<Avatar className="h-5 w-5">
					<AvatarImage src={currentOrganization?.avatar || ""} />
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
	}, [currentOrganization, isLoading])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					aria-label="Select organization"
					className={cn("w-[100%] items-center gap-2", className)}
					disabled={isLoading}
				>
					{renderButtonContent}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandList>
						<CommandInput placeholder="Search organization..." />
						<CommandEmpty>No organization found.</CommandEmpty>
						<CommandGroup heading="Organizations">
							{!!organizations?.length &&
								organizations?.map((o) => (
									<CommandOrganization
										key={o.id}
										organization={o}
										onSelect={({ id }) => {
											setCurrentOrganization(id)
											setOpen(false)
										}}
										active={o.id === currentOrganization?.id}
									/>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
