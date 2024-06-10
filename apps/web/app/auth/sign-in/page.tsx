import Link from "next/link"
import { redirect } from "next/navigation"
import { SignInForm } from "./page.components"
import routes from "@/config/routes"
import { Button } from "@/components/ui/button"
import { getServerAuthSession } from "@/lib/server-session"

export default async function SignIn() {
	const session = await getServerAuthSession()

	if (!!session?.user) redirect(routes.dashboard)

	return (
		<>
			<div className="flex flex-col text-center">
				<h1 className="text-2xl font-semibold tracking-tight">
					Sign in to your account
				</h1>
			</div>
			<SignInForm />
			<div className="text-sm text-muted-foreground">
				<span>No account?</span>
				<Button asChild variant="link" className="p-0">
					<Link href={routes.signup} className="ms-1 text-foreground">
						Create one
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
