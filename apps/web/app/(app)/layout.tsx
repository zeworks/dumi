import routes from "@/config/routes"
import { Header } from "./_components/header"
import SideNav from "./_components/side-nav"
import { RedirectType, redirect } from "next/navigation"
import { getServerAuthSession } from "@/lib/server-session"
import { OrganizationsProvider } from "./_providers/organizations"
import AuthMiddlewareValidator from "@/components/auth-middleware-validator"
import { getUserOrganizations } from "@/actions/user-organizations"

export default async function AppLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerAuthSession()

	if (session === null) redirect(routes.signin, RedirectType.replace)

	const organizations = await getUserOrganizations(session?.user?.id)

	return (
		<AuthMiddlewareValidator>
			<OrganizationsProvider organizations={organizations}>
				<div className="grid w-full pl-[56px] h-[100vh]">
					<SideNav />
					<main className="flex-1 flex flex-col px-4">
						<Header />
						<section className="pt-4 flex-1">
							{/* <Breadcrumb /> */}
							{children}
						</section>
					</main>
				</div>
			</OrganizationsProvider>
		</AuthMiddlewareValidator>
	)
}
