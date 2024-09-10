import { createOrganization } from "@/actions/organizations"
import {
	CreateOrganizationInput,
	CreateOrganizationOutput,
} from "@dumi/zod/contracts/organization"
import { useMutation } from "@tanstack/react-query"
import { useOrganizationsContext } from "../_providers/organizations"

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
