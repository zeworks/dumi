"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps, forwardRef } from "react"

export type NavLinkProps = ComponentProps<typeof Link>

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
	(props, ref) => {
		const pathname = usePathname()

		const isActive = pathname === props.href

		return (
			<Link
				ref={ref} // Forward the ref here
				data-active={isActive}
				className={cn(
					"text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:text-primary",
					props.className
				)}
				{...props}
			/>
		)
	}
)

NavLink.displayName = "NavLink"
