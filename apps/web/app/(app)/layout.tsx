import { Header } from "./_components/header"
import { SideNav } from "./_components/side-nav"

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
