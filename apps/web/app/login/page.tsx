import Link from "next/link"

import { Icons } from "@/components/icons"
import { LoginForm } from "./_components/login-form"

export default function Login() {
	return (
		<main className="relative h-[100vh]">
			<div className="absolute text-black dark:text-white lg:hidden flex items-center text-lg font-bold top-8 left-8">
				<Icons.logoSmall className="mr-2 h-6 w-6 fill-black dark:fill-white" />
				Dumi
			</div>
			<div className="container flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 h-[100%]">
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
					<div className="relative text-black dark:text-white z-20 flex items-center text-lg font-bold">
						<Icons.logoSmall className="mr-2 h-6 w-6 fill-black dark:fill-white" />
						Dumi
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2 text-black dark:text-white">
							<p className="text-lg">
								&ldquo;This library has saved me countless hours of work and
								helped me deliver stunning designs to my clients faster than
								ever before.&rdquo;
							</p>
							<footer className="text-sm">Sofia Davis</footer>
						</blockquote>
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Sign in to your account
							</h1>
						</div>
						<LoginForm />
						<p className="px-8 text-center text-sm text-muted-foreground">
							By clicking continue, you agree to our{" "}
							<Link
								href="/terms"
								className="underline underline-offset-4 hover:text-primary"
							>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy"
								className="underline underline-offset-4 hover:text-primary"
							>
								Privacy Policy
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}
