"use client"

import { Button } from "@/components/ui/button"
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import {
	CREATE_ORGANIZATION_INPUT,
	CreateOrganizationInput,
} from "@dumi/zod/contracts/organization"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputController } from "@/components/input-controller"
import { useCreateOrganization } from "../_services/organization"
import { Organization } from "@dumi/zod/schemas"
import { Loader2 } from "lucide-react"

export default function DialogCreateOrganization({
	onSuccess,
}: {
	onSuccess: (data: Organization) => void
}) {
	const { mutateAsync, isPending } = useCreateOrganization()

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<CreateOrganizationInput>({
		resolver: zodResolver(CREATE_ORGANIZATION_INPUT),
		mode: "onSubmit",
		defaultValues: {
			name: "",
		},
	})

	const submit = async (data: CreateOrganizationInput) => {
		const response = await mutateAsync(data)
		reset() // reset the form
		onSuccess(response)
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Create Organization</DialogTitle>
				<DialogDescription>
					Fill out the fields to create a new organization
				</DialogDescription>
			</DialogHeader>
			<form className="grid gap-4 py-4" onSubmit={handleSubmit(submit)}>
				<div>
					<Label htmlFor="name">Name</Label>
					<InputController
						errors={errors}
						register={register}
						name="name"
						id="name"
						placeholder="e.g. dumi-org"
						type="text"
					/>
				</div>
				<div className="flex justify-end">
					<Button type="submit" disabled={isPending}>
						{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Create
					</Button>
				</div>
			</form>
		</DialogContent>
	)
}
