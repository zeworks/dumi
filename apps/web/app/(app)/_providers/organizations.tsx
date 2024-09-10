"use client"

import useLocalStorage from "@/lib/storage"
import { Organization } from "@dumi/zod/schemas"
import { createContext, useContext, useEffect, useState } from "react"

type OrganizationContextType = {
	organizations?: Organization[]
	currentOrganization?: Organization
	setCurrentOrganization: (organization: Organization) => void
	setOrganizations: (organizations: Organization[]) => void
}
export const OrganizationsContext = createContext<OrganizationContextType>(
	null as any
)

export function OrganizationsProvider({
	children,
	organizations: defaultOrganizations,
}: {
	organizations?: Organization[]
	children: React.ReactNode
}) {
	const [savedOrganization, saveOrganization] = useLocalStorage<
		string | undefined
	>("_co", undefined)
	const [currentOrganization, setCurrentOrganization] = useState<Organization>()
	const [organizations, setOrganizations] = useState(defaultOrganizations)

	useEffect(() => {
		if (!savedOrganization && !!organizations?.length)
			saveOrganization(organizations[0].id)

		// if is cached, and no organizations from the server
		// clear it
		if (!!savedOrganization && !organizations?.length)
			saveOrganization(undefined)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizations, savedOrganization])

	useEffect(() => {
		setCurrentOrganization(
			organizations?.find((o) => o.id === savedOrganization)
		)
	}, [savedOrganization, organizations])

	const onSaveOrganization = (organization: Organization) => {
		saveOrganization(organization.id)
	}

	return (
		<OrganizationsContext.Provider
			value={{
				organizations,
				currentOrganization,
				setCurrentOrganization: onSaveOrganization,
				setOrganizations,
			}}
		>
			{children}
		</OrganizationsContext.Provider>
	)
}

export function useOrganizationsContext() {
	const context = useContext(OrganizationsContext)

	if (!context) {
		throw new Error(
			"useOrganizationsContext must be used within an OrganizationsProvider"
		)
	}

	return context
}
