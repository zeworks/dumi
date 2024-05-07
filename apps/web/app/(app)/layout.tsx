import { routes } from "@/constants"
import { Header } from "./_components/header"
import { SideNav } from "./_components/side-nav"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function AppLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession()

	if (!session?.user) redirect(routes.signin)

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
