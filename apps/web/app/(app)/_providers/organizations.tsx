"use client"

import { useGetUserOrganizations } from "../_hooks/use-get-user-organizations"
import useLocalStorage from "@/lib/storage"
import { Organization } from "@dumi/zod/schemas"
import { useSession } from "next-auth/react"
import { createContext, useContext, useEffect } from "react"

type OrganizationContextType = {
	organizations?: Organization[]
	isLoading: boolean
	currentOrganization?: string
	setCurrentOrganization: (organizationId?: string) => void
}
export const OrganizationsContext = createContext<OrganizationContextType>(
	null as any
)

export function OrganizationsProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const session = useSession()
	const { data: organizations, isLoading } = useGetUserOrganizations(
		session.data?.user.id
	)

	const [currentOrganization, setCurrentOrganization] = useLocalStorage<
		string | undefined
	>("_co", undefined)

	useEffect(() => {
		if (!currentOrganization && !!organizations?.length && !isLoading)
			setCurrentOrganization(organizations[0].id)

		// if is cached, and no organizations from the server
		// clear it
		if (!!currentOrganization && !organizations?.length && !isLoading)
			setCurrentOrganization(undefined)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizations, currentOrganization])

	return (
		<OrganizationsContext.Provider
			value={{
				organizations,
				isLoading,
				currentOrganization,
				setCurrentOrganization,
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
