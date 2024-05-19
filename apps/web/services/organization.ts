import { Organization } from "@dumi/zod/schemas"
import { useQuery } from "@tanstack/react-query"

const createOrganization = () => {}
const getOrganizations = async () => {
	const organizations = await fetch(`http://127.0.0.1:4000/organizations`)
	if (!organizations.ok) throw new Error("Failed to fetch organizations")
	return organizations.json()
}

// TODO: we can save it on the localstorage for now, and later save it on DB
const setOrganization = () => {}

export const useOrganizationList = () => {
	const { data: organizations, refetch: loadOrganizations } = useQuery<
		Organization[]
	>({
		queryKey: ["get-organizations"],
		queryFn: getOrganizations,
		enabled: false,
	})

	return {
		organizations,
		getOrganizations: loadOrganizations,
	}
}
