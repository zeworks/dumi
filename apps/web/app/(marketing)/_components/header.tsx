import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import routes from "@/config/routes"
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
							<li className="text-muted-foreground hover:text-primary dark:hover:text-white">
								<a href="#">Product</a>
							</li>
							<li className="text-muted-foreground hover:text-primary dark:hover:text-white">
								<a href="#">Pricing</a>
							</li>
							<li className="text-muted-foreground hover:text-primary dark:hover:text-white">
								<a href="#">Solutions</a>
							</li>
							<li className="text-muted-foreground hover:text-primary dark:hover:text-white">
								<a href="#">Resources</a>
							</li>
						</ul>
					</nav>
				</div>
				<div>
					<Button asChild variant="link">
						<Link href={routes.signin}>Request demo</Link>
					</Button>
					<Button asChild variant="default" className="ms-2">
						<Link href={routes.signin}>Try Dumi for free</Link>
					</Button>
				</div>
			</div>
		</header>
	)
}
