"use client"

import { PlusIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import { useOrganizationsContext } from "../_providers/organizations"
import { Organization } from "@dumi/zod/schemas"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DialogCreateOrganization } from "./organization-switcher.components"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

const getOrganizationNameInitials = (name: string) =>
	[
		name.split(" ")?.[0]?.charAt(0),
		name.split(" ")?.[name.split(" ").length - 1]?.charAt(0),
	]
		.join("")
		.toUpperCase()

function OrganizationSwitcher() {
	const { organizations, currentOrganization, setCurrentOrganization } =
		useOrganizationsContext()

	return (
		<div className="flex space-x-3 items-center border-b pt-2 px-2">
			<Organizations
				organizations={organizations}
				onSetOrganization={setCurrentOrganization}
				selectedOrganization={currentOrganization}
			/>
		</div>
	)
}

function Organizations({
	organizations,
	onSetOrganization,
	selectedOrganization,
}: {
	organizations?: Organization[]
	selectedOrganization?: Organization
	onSetOrganization: (organization: Organization) => void
}) {
	const router = useRouter()
	const [showDialogCreateOrganization, setShowDialogCreateOrganization] =
		useState(false)

	const onCreateOrganization = useCallback((organization: Organization) => {
		setShowDialogCreateOrganization(false)
		router.push(`/organizations/${organization.id}`)
	}, [])

	if (!selectedOrganization && !organizations?.length) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Dialog
							open={showDialogCreateOrganization}
							onOpenChange={setShowDialogCreateOrganization}
						>
							<DialogTrigger>
								<Button size="icon" variant="outline" className="mb-2">
									<PlusIcon />
								</Button>
							</DialogTrigger>
							<DialogCreateOrganization onSuccess={onCreateOrganization} />
						</Dialog>
					</TooltipTrigger>
					<TooltipContent side="right">Create Organization</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	}

	if (!selectedOrganization) return

	return (
		<div className="group relative group pb-3">
			<Button
				size="icon"
				variant="outline"
				className="relative group-hover:before:opacity-0 before:absolute before:z-[-1] before:w-full before:h-full before:border before:border-muted-foreground before:top-[4px] before:rounded-[9px] before:bg-muted-foreground before:opacity-50 before:transition-opacity before:delay-75 group-hover:after:opacity-0 after:absolute after:z-[-1] after:w-[80%] after:h-full after:border after:border-muted-foreground after:top-[7px] after:rounded-md after:bg-muted-foreground after:opacity-40 after:transition-opacity after:delay-100"
			>
				<Avatar className="size-full rounded-md">
					<AvatarImage
						src={selectedOrganization?.avatar || ""}
						className="object-cover"
					/>
					<AvatarFallback className="text-md font-semibold rounded-none">
						{getOrganizationNameInitials(selectedOrganization.name)}
					</AvatarFallback>
				</Avatar>
			</Button>
			<div className="group-hover:opacity-100 group-hover:visible group-hover:top-[40px] invisible transition-all flex absolute bg-background border p-2 rounded-md flex-col top-[30px] opacity-0 delay-75">
				{organizations?.map((org) => {
					const avatarOrgName = getOrganizationNameInitials(org.name)

					return (
						<div
							key={org.id}
							onClick={() => onSetOrganization(org)}
							className={cn(
								"flex items-center space-x-2 w-[250px] cursor-pointer transition-opacity opacity-100 hover:bg-accent rounded-md p-2"
							)}
						>
							<Avatar
								className={cn(
									"size-[40px] rounded-md border-muted-foreground ",
									{
										"border-[2px] border-muted-foreground dark:border-white":
											selectedOrganization?.id === org.id,
									}
								)}
							>
								<AvatarImage src={org?.avatar || ""} className="object-cover" />
								<AvatarFallback className="text-sm font-semibold rounded-none">
									{avatarOrgName}
								</AvatarFallback>
							</Avatar>
							<span className="text-sm text-foreground">{org.name}</span>
						</div>
					)
				})}
				<Dialog
					open={showDialogCreateOrganization}
					onOpenChange={setShowDialogCreateOrganization}
				>
					<DialogTrigger>
						<div className="flex items-center justify-start space-x-2 cursor-pointer rounded-md p-2 hover:bg-accent">
							<div className="flex items-center justify-center rounded-md bg-muted size-[40px] text-muted-foreground">
								<PlusIcon className="size-5" />
							</div>
							<span className="text-sm text-foreground">
								Create Organization
							</span>
						</div>
					</DialogTrigger>
					<DialogCreateOrganization onSuccess={onCreateOrganization} />
				</Dialog>
			</div>
		</div>
	)
}

export default OrganizationSwitcher
