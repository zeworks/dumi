import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
	return (
		<header className="container flex items-center justify-between py-4">
			<div className="flex items-center">
				<Icons.logoFull className="fill-black dark:fill-white w-[130px] h-auto mr-10" />
				<nav>
					<ul className="flex gap-4 items-center text-sm">
						<li>
							<a href="#">Product</a>
						</li>
						<li>
							<a href="#">Pricing</a>
						</li>
						<li>
							<a href="#">Solutions</a>
						</li>
						<li>
							<a href="#">Resources</a>
						</li>
					</ul>
				</nav>
			</div>
			<Button asChild className="" variant="secondary">
				<Link href="/login">Login</Link>
			</Button>
		</header>
	)
}
