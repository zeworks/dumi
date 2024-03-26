import { Header } from "./_components/header"

export default function Home() {
	return (
		<>
			<Header />
			<main className="bg-background min-h-screen p-24">
				<div className="z-10 max-w-4xl m-auto h-full w-full items-center justify-center flex flex-col text-center">
					<h1 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text font-extrabold tracking-[-0.04em] leading-none text-[40px] md:text-5xl lg:text-[80px] text-center text-transparent">
						Empowering teams while simplifying work
					</h1>
					<div className="max-w-2xl">
						<p className="text-xl text-muted-foreground mt-5">
							Experience seamless integration of efficiency and ease on our
							platform, fostering optimal productivity for your team's success.
						</p>
					</div>
				</div>
			</main>
		</>
	)
}
