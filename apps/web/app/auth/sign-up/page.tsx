import Link from "next/link"
import { SignUpForm } from "./page.components"
import { Button } from "@/components/ui/button"
import routes from "@/config/routes"

export default function SignUp() {
	return (
		<>
			<div className="flex flex-col text-center">
				<h1 className="text-2xl font-semibold tracking-tight">
					Sign up your account
				</h1>
			</div>
			<SignUpForm />
			<div className="text-sm text-muted-foreground">
				<span>Already have an account?</span>
				<Button asChild variant="link" className="p-0">
					<Link href={routes.signin} className="ms-1 text-foreground">
						Sign in
					</Link>
				</Button>
			</div>
			<div className="px-8 text-center text-sm text-muted-foreground">
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
			</div>
		</>
	)
}
