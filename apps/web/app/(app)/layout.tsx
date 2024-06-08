import routes from "@/config/routes"
import { Header } from "./_components/header"
import { SideNav } from "./_components/side-nav"
import { redirect } from "next/navigation"
import { getServerAuthSession } from "@/lib/server-session"

export default async function AppLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerAuthSession()

	if (session === null) redirect(routes.signin)

	// display grid with SideNav on left side and content on right side
	return (
		<div className="grid w-full pl-[56px] h-[100vh]">
			<SideNav />
			<main className="flex-1 flex flex-col px-4">
				<Header />
				<section className="py-4 flex-1">{children}</section>
			</main>
		</div>
	)
}
