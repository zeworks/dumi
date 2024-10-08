"use client"

import {
	Breadcrumb as ShadcnBreadcrumb,
	BreadcrumbList,
	BreadcrumbSeparator,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import routes from "@/config/routes"
import Link from "next/link"

type BreadcrumbData = {
	label: string
	href: string
}

function getBreadcrumbs(pathname: string) {
	const pathSegments = pathname.split("/").filter(Boolean)
	const breadcrumbs: Array<BreadcrumbData> = []

	let accumulatedPath = "/"

	pathSegments.forEach((segment, index) => {
		accumulatedPath += `${segment}`

		// Find matching route by replacing dynamic segment (like {id})
		const routeKey = Object.keys(routes).find(
			(key) =>
				(routes as any)[key].includes(segment) ||
				(routes as any)[key].includes(`{${segment}}`)
		)

		// Handle dynamic segments (e.g., organization ID)
		let href = (routes as any)[routeKey || ""] || accumulatedPath
		let label = segment.charAt(0).toUpperCase() + segment.slice(1) // Capitalize first char of segment
		const isLastSegment = index === pathSegments.length - 1

		breadcrumbs.push({
			label: label,
			href: isLastSegment ? null : href, // No href for last segment
		})

		accumulatedPath += "/"
	})

	return breadcrumbs
}

export default function Breadcrumb(props: any) {
	const pathname = usePathname()
	const breadcrumbs = useMemo(() => getBreadcrumbs(pathname), [pathname])

	// if no breadcrumbs, dont render it
	// if only one element in the breadcrumb, dont render it
	if (!breadcrumbs.length || breadcrumbs.length === 1) return null

	return (
		<ShadcnBreadcrumb className="mb-4">
			<BreadcrumbList>
				{breadcrumbs.map((crumb, index) => (
					<BreadcrumbItem key={index}>
						{crumb.href ? (
							<>
								<BreadcrumbLink asChild>
									<Link href={crumb.href}>{crumb.label}</Link>
								</BreadcrumbLink>
								<BreadcrumbSeparator />
							</>
						) : (
							<BreadcrumbPage>{crumb.label}</BreadcrumbPage>
						)}
					</BreadcrumbItem>
				))}
			</BreadcrumbList>
		</ShadcnBreadcrumb>
	)
}
