"use client"

import useLocalStorage from "@/lib/storage"
import { useSession } from "@/providers/session"
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

type StoredOrganization =
	| {
			/**
			 * user id
			 */
			uid: string
			/**
			 * organization id
			 */
			oid: string
	  }
	| undefined

export function OrganizationsProvider({
	children,
	organizations: defaultOrganizations,
}: {
	organizations?: Organization[]
	children: React.ReactNode
}) {
	const session = useSession()
	const [savedOrganization, saveOrganization] =
		useLocalStorage<StoredOrganization>("_co", undefined)
	const [currentOrganization, setCurrentOrganization] = useState<Organization>()
	const [organizations, setOrganizations] = useState(defaultOrganizations)

	useEffect(() => {
		if (!session?.data?.user?.id) return

		if (!savedOrganization && !!organizations?.length)
			saveOrganization({
				uid: session.data.user.id,
				oid: organizations[0].id,
			})

		// if is cached, and no organizations from the server
		// clear it
		if (!!savedOrganization && !organizations?.length)
			saveOrganization(undefined)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizations, savedOrganization])

	useEffect(() => {
		if (!organizations?.length) return

		setCurrentOrganization(
			organizations?.find((o) => o.id === savedOrganization?.oid) ||
				organizations[0]
		)
	}, [savedOrganization, organizations])

	const onSaveOrganization = (organization: Organization) => {
		saveOrganization({
			uid: session.data?.user.id || "",
			oid: organization.id,
		})
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
