import { Header, Hero } from "./page.components"

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="p-24">
				<Hero />
			</main>
		</div>
	)
}
