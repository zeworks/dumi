import { ReactNode } from "react"
import NavigationSideBar from "./_components/navigation-sidebar"

export default function OrganizationsLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<div className="flex flex-1 h-full flex-col gap-4 md:gap-8">
			<div className="mx-auto grid w-full gap-2">
				<h1 className="text-xl font-extrabold tracking-tight lg:text-2xl">
					Organizations
				</h1>
			</div>
			<div className="flex flex-1">
				<div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
					<NavigationSideBar />
					<div className="grid gap-6">{children}</div>
				</div>
			</div>
		</div>
	)
}
