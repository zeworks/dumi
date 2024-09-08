"use client"

import { useOrganizationsContext } from "../_providers/organizations"

export function OrganizationDropdown() {
	const { currentOrganization } = useOrganizationsContext()

	if (!currentOrganization) return null

	return <p className="m-0 text-normal">/ {currentOrganization.name}</p>
}
