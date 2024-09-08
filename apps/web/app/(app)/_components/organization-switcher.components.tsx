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
import * as OrganizationContract from "@dumi/zod/contracts/organization"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputController } from "@/components/input-controller"

export function DialogCreateOrganization() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<OrganizationContract.CreateOrganizationInput>({
		resolver: zodResolver(OrganizationContract.CREATE_ORGANIZATION_INPUT),
		mode: "onSubmit",
		defaultValues: {
			name: "",
		},
	})

	const onSubmit = (data: OrganizationContract.CreateOrganizationInput) => {
		console.log("data", data)
		reset()
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Create Organization</DialogTitle>
				<DialogDescription>
					Fill out the fields to create a new organization
				</DialogDescription>
			</DialogHeader>
			<form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
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
					<Button type="submit">Create</Button>
				</div>
			</form>
		</DialogContent>
	)
}
