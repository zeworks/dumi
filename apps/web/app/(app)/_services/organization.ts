import { createOrganization, getOrganization } from "@/actions/organizations"
import {
	CreateOrganizationInput,
	CreateOrganizationOutput,
} from "@dumi/zod/contracts/organization"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useOrganizationsContext } from "../_providers/organizations"
import { Organization } from "@dumi/zod/schemas"

export const useCreateOrganization = () => {
	const context = useOrganizationsContext()

	return useMutation<CreateOrganizationOutput, any, CreateOrganizationInput>({
		mutationKey: ["create-organization"],
		mutationFn: createOrganization,
		onSuccess: (newOrganization) => {
			if (newOrganization)
				context.setOrganizations([
					...(context.organizations || []),
					newOrganization,
				])
		},
	})
}

export const useGetOrganization = (id: string) => {
	return useQuery({
		queryKey: ["get-organization"],
		queryFn: () => getOrganization(id),
		refetchOnWindowFocus: false,
	})
}
