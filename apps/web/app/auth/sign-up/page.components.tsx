"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ComponentProps, useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSignupMutation } from "./page.hooks"
import { useForm } from "react-hook-form"
import {
	CreateUserContractInput,
	CREATE_USER_CONTRACT_INPUT,
} from "@dumi/zod/contracts/user"
import { zodResolver } from "@hookform/resolvers/zod"

type Props = ComponentProps<"div">
type FormSchema = CreateUserContractInput

export function SignUpForm({ className, ...props }: Props) {
	const router = useRouter()
	const { data, mutate, isPending } = useSignupMutation()
	const { control, register, handleSubmit } = useForm<FormSchema>({
		resolver: zodResolver(CREATE_USER_CONTRACT_INPUT),
	})

	async function onSubmit(data: FormSchema) {
		mutate(data)
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						{/* add first name and last name fields */}
						<Label htmlFor="username">Username</Label>
						<Input
							{...register("name", {
								required: true,
							})}
							id="username"
							placeholder="johndoe"
							type="text"
							autoCapitalize="words"
							autoComplete="username"
							autoCorrect="on"
							required
						/>
					</div>
					<div className="grid mt-2 gap-1">
						<Label htmlFor="email">Email</Label>
						<Input
							{...register("email", {
								required: true,
								pattern: /^\S+@\S+$/i,
							})}
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							required
							disabled={isPending}
						/>
					</div>
					<div className="grid mt-2 mb-4 gap-1">
						<Label htmlFor="password">Password</Label>
						<Input
							{...register("password", {
								required: true,
								minLength: 8,
							})}
							id="password"
							placeholder="******"
							type="password"
							autoCapitalize="none"
							autoComplete="password"
							autoCorrect="off"
							required
							disabled={isPending}
						/>
					</div>
					<Button disabled={isPending}>
						{isPending && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Sign up
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<div className="grid gap-2">
				<Button variant="outline" type="button" disabled={isPending}>
					<Icons.google className="mr-2 h-4 w-4" />
					Google
				</Button>
			</div>
		</div>
	)
}
