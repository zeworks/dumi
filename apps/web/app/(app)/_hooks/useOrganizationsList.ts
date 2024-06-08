"use client"

import * as actions from "@/actions/user-organizations"
import useLocalStorage from "@/lib/storage"
import { Organization } from "@dumi/zod/schemas"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export function useOrganizationsList(userId?: string) {
	const { data: organizations, isPending: isLoading } = useQuery({
		queryKey: ["organizations"],
		queryFn: async () => await actions.getUserOrganizations(userId),
	})

	const [currentOrganization, setCurrentOrganization] = useLocalStorage<
		Organization | undefined
	>("_current-organization", undefined)

	const onSetCurrentOrganization = (organization: Organization) => {
		// set the current organization locally
		setCurrentOrganization(organization)
		// set the current organization on the server
		actions.setCurrentOrganization(organization)
	}

	useEffect(() => {
		if (!currentOrganization && !!organizations?.length && !isLoading)
			onSetCurrentOrganization(organizations[0])

		// if is cached, and no organizations from the server
		// clear it
		if (!!currentOrganization && !organizations?.length && !isLoading)
			setCurrentOrganization(undefined)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizations, currentOrganization])

	return {
		organizations,
		currentOrganization,
		setCurrentOrganization: onSetCurrentOrganization,
		isLoading,
	}
}
