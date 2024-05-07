import Link from "next/link"
import { SignUpForm } from "./page.components"

export default function SignUp() {
	return (
		<>
			<div className="flex flex-col text-center">
				<h1 className="text-2xl font-semibold tracking-tight">
					Sign up your account
				</h1>
			</div>
			<SignUpForm />
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
		</>
	)
}
