import { Icons } from "@/components/icons"
import Link from "next/link"

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className="relative h-[100vh]">
			<Link
				href="/"
				className="absolute text-black dark:text-white lg:hidden inline-flex items-center text-lg font-bold top-8 left-8"
			>
				<Icons.logoSmall className="mr-2 h-4 w-4 fill-black dark:fill-white" />
				Dumi
			</Link>
			<div className="container items-center justify-center flex lg:max-w-none lg:px-0 h-[100%]">
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
					<Link
						href="/"
						className="relative text-black dark:text-white z-20 inline-flex items-center text-lg font-bold"
					>
						<Icons.logoSmall className="mr-2 h-7 w-7 fill-black dark:fill-white" />
						Dumi
					</Link>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2 text-black dark:text-white">
							<p className="text-lg">
								&ldquo;This library has saved me countless hours of work and
								helped me deliver stunning designs to my clients faster than
								ever before.&rdquo;
							</p>
							<footer className="text-sm">Sofia Davis</footer>
						</blockquote>
					</div>
				</div>
				<div className="lg:p-8 w-full min-[1024px]:max-w-[45vw] min-[1200px]:max-w-[450px]">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6">
						{children}
					</div>
				</div>
			</div>
		</main>
	)
}
