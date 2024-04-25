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

type AuthenticationFormProps = ComponentProps<"div">

export function LoginForm({ className, ...props }: AuthenticationFormProps) {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	// TODO: add authentication service
	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			// redirect to the dashboard page
			router.push("/dashboard")
			setIsLoading(false)
		}, 3000)
	}

	useEffect(() => {}, [])

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label htmlFor="email">Email</Label>
						<Input
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
						<Input
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
				<Button variant="outline" type="button" disabled={isLoading}>
					<Icons.google className="mr-2 h-4 w-4" />
					Google
				</Button>
				<Button
					variant="outline"
					type="button"
					disabled={isLoading}
					onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
				>
					<Icons.gitHub className="mr-2 h-4 w-4" />
					GitHub
				</Button>
				<Button variant="outline" type="button" disabled={isLoading}>
					<Icons.azure className="mr-2 h-4 w-4" />
					Azure DevOps
				</Button>
			</div>
		</div>
	)
}
