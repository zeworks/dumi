import React from "react"
import { Header } from "./_components/header"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="p-24">{children}</main>
		</div>
	)
}
