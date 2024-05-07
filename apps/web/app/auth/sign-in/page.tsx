import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { SignInForm } from "./page.components"
import { routes } from "@/constants"
import { Button } from "@/components/ui/button"

export default async function SignIn() {
	const session = await getServerSession()

	if (!!session?.user) redirect("/dashboard")

	return (
		<>
			<div className="flex flex-col text-center">
				<h1 className="text-2xl font-semibold tracking-tight">
					Sign in to your account
				</h1>
			</div>
			<SignInForm />
			<p className="text-sm text-muted-foreground">
				<span>No account?</span>
				<Button asChild variant="link" className="p-0">
					<Link href={routes.signup} className="ms-1 text-foreground">
						Create one
					</Link>
				</Button>
			</p>
		</>
	)
}
