"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"
import { useRouter } from "next/navigation"
import { useSignupMutation } from "./page.hooks"
import { useForm } from "react-hook-form"
import { CREATE_USER_CONTRACT_INPUT } from "@dumi/zod/contracts/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputController } from "@/components/input-controller"
import { signIn } from "next-auth/react"
import routes from "@/config/routes"
import { useToast } from "@/components/ui/use-toast"

type Props = ComponentProps<"div">
type FormSchema = {
	name: string
	email: string
	password: string
}

export function SignUpForm({ className, ...props }: Props) {
	const router = useRouter()
	const { data, mutateAsync, isPending } = useSignupMutation()
	const { toast } = useToast()

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormSchema>({
		resolver: zodResolver(CREATE_USER_CONTRACT_INPUT),
	})

	async function onSubmit(data: FormSchema) {
		const response = await mutateAsync(data)

		if (response.type === "success") {
			toast({
				title: "Account created!",
				description:
					"Your account has been created. Verify your email to activate your account.",
				variant: "default",
			})
			reset()
		} else {
			toast({
				title: response.error.message || "Sign up failed",
				description: response.error.detail || "Please try again later.",
				variant: "destructive",
			})
		}
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
						<InputController
							register={register("password", {
								required: true,
							})}
							control={control}
							id="password"
							name="password"
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
				<Button
					onClick={() =>
						signIn("google", {
							callbackUrl: routes.dashboard,
						})
					}
					variant="outline"
					type="button"
				>
					<Icons.google className="mr-2 h-4 w-4" />
					Google
				</Button>
				<Button
					onClick={() =>
						signIn("github", {
							callbackUrl: routes.dashboard,
						})
					}
					variant="outline"
					type="button"
				>
					<Icons.gitHub className="mr-2 h-4 w-4" />
					GitHub
				</Button>
			</div>
		</div>
	)
}
