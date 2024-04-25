import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
	return (
		<header className="py-4">
			<div className="container flex items-center justify-between">
				<div className="flex items-center">
					<Link
						className="text-lg font-bold text-white flex items-center mr-8"
						href="/"
					>
						<Icons.logoSmall className="h-4 w-auto mr-2" />
						<span>Dumi</span>
					</Link>
					<nav>
						<ul className="flex gap-4 items-center text-sm">
							<li className="text-muted-foreground hover:text-white">
								<a href="#">Product</a>
							</li>
							<li className="text-muted-foreground hover:text-white">
								<a href="#">Pricing</a>
							</li>
							<li className="text-muted-foreground hover:text-white">
								<a href="#">Solutions</a>
							</li>
							<li className="text-muted-foreground hover:text-white">
								<a href="#">Resources</a>
							</li>
						</ul>
					</nav>
				</div>
				<Button asChild variant="secondary">
					<Link href="/auth/login">Sign in</Link>
				</Button>
			</div>
		</header>
	)
}

export function Hero() {
	return (
		<div className="z-10 max-w-4xl m-auto h-full w-full items-center justify-center flex flex-col text-center">
			<h1 className="py-2 font-semibold tracking-[-0.04em] leading-none text-[40px] md:text-5xl lg:text-[80px] text-center">
				Empowering teams while simplifying work
			</h1>
			<div className="max-w-2xl">
				<p className="text-xl text-muted-foreground mt-5">
					Experience seamless integration of efficiency and ease on our
					platform, fostering optimal productivity for your team's success.
				</p>
			</div>
		</div>
	)
}
