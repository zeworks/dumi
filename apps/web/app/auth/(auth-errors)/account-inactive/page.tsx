import { Button } from "@/components/ui/button"
import routes from "@/config/routes"
import Link from "next/link"

export default function Page() {
	// return simple screen to display "Your account is inactive"
	// add a button to return to the sign-in page
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold mb-4">Your account is inactive</h1>
			<p className="text-gray-500 mb-8">
				Please contact support to activate your account.
			</p>
			<Button asChild variant="outline">
				<Link href={routes.signin}>Go to Sign In</Link>
			</Button>
		</div>
	)
}
