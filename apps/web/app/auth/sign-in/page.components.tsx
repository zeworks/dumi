"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ComponentProps, useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import routes from "@/config/routes"
import { useForm } from "react-hook-form"
import {
	CREATE_AUTH_CREDENTIALS_CONTRACT,
	CreateAuthCredentialsContract,
} from "@dumi/zod/contracts/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputController } from "@/components/input-controller"
import { useToast } from "@/components/ui/use-toast"

type Props = ComponentProps<"div">

export function SignInForm({ className, ...props }: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const { toast } = useToast()

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateAuthCredentialsContract>({
		resolver: zodResolver(CREATE_AUTH_CREDENTIALS_CONTRACT),
	})

	async function onSubmit(data: CreateAuthCredentialsContract) {
		setIsLoading(true)

		const response = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		})

		setIsLoading(false)
		if (response?.ok) router.push(routes.dashboard)
		else
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
				description:
					response?.error ||
					"An unexpected error occurred. Please try again later.",
			})
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label htmlFor="email">Email</Label>
						<InputController
							register={register("email")}
							control={control}
							name="email"
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							required
							disabled={isLoading}
						/>
					</div>
					<div className="grid mt-2 mb-4 gap-1">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link
								href="/forgot-password"
								className="ml-auto inline-block text-sm underline"
							>
								Forgot your password?
							</Link>
						</div>
						<InputController
							register={register("password")}
							name="password"
							control={control}
							id="password"
							placeholder="******"
							type="password"
							autoCapitalize="none"
							autoComplete="password"
							autoCorrect="off"
							required
							disabled={isLoading}
						/>
					</div>
					<Button disabled={isLoading}>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Sign In
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
					disabled={isLoading}
				>
					<Icons.google className="mr-2 h-4 w-4" />
					Google
				</Button>
				<Button
					onClick={() => signIn("github")}
					variant="outline"
					type="button"
					disabled={isLoading}
				>
					<Icons.gitHub className="mr-2 h-4 w-4" />
					GitHub
				</Button>
			</div>
		</div>
	)
}
