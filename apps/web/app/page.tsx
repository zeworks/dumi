import { Header, Hero } from "./page.components"

export default function Home() {
	return (
		<div className="min-h-screen bg-black bg-gradient-to-b from-blue-950 to-transparent">
			<Header />
			<main className="p-24">
				<Hero />
			</main>
		</div>
	)
}
