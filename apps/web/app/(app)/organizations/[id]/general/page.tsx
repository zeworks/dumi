"use client"
import { useParams } from "next/navigation"

export default function Page(props: any) {
	const params = useParams<{ id: string }>()

	return (
		<div className="flex flex-1 flex-col h-full">
			<h1 className="mb-2 text-xl font-extrabold tracking-tight lg:text-2xl">
				Organization Detail {params.id} General
			</h1>
		</div>
	)
}
