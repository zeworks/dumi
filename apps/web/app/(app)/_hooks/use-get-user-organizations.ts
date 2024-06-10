"use client"

import * as actions from "@/actions/user-organizations"
import { useQuery } from "@tanstack/react-query"

export function useGetUserOrganizations(userId?: string) {
	const query = useQuery({
		queryKey: ["organizations"],
		queryFn: async () => await actions.getUserOrganizations(userId),
	})

	return query
}
