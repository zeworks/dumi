"use client"

import { useState } from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useOrganizationsContext } from "../_providers/organizations"
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import routes from "@/config/routes"

export default function OrganizationDropdown() {
	// state
	const [open, setOpen] = useState(false)

	// context
	const { currentOrganization, isOwner } = useOrganizationsContext()

	if (!currentOrganization) return null

	return (
		<div>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<div className="flex items-center content-between select-none cursor-pointer">
						<span className="m-0 text-sm uppercase font-bold">
							{currentOrganization.name}
						</span>
						{open ? (
							<CaretUpIcon className="ml-1" />
						) : (
							<CaretDownIcon className="ml-1" />
						)}
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem asChild>
						<Link
							href={routes.organizationGeneral.replace(
								"{id}",
								currentOrganization.id
							)}
						>
							Profile
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>Billing</DropdownMenuItem>
					<DropdownMenuItem>Team</DropdownMenuItem>
					<DropdownMenuItem>Subscription</DropdownMenuItem>
					{isOwner && (
						<DropdownMenuItem asChild>
							<Link
								href={routes.organizationSettings.replace(
									"{id}",
									currentOrganization.id
								)}
							>
								Settings
							</Link>
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
