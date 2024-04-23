"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"

export type NavLinkProps = ComponentProps<typeof Link>

export function NavLink(props: NavLinkProps) {
	const pathname = usePathname()

	const isActive = pathname === props.href

	return (
		<Link
			data-active={isActive}
			className={cn(
				"text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:text-primary",
				props.className
			)}
			{...props}
		/>
	)
}
