"use client"
import { useGetOrganization } from "@/app/(app)/_services/organization"
import { useParams } from "next/navigation"

export default function Page(props: any) {
	const params = useParams<{ id: string }>()
	const org = useGetOrganization(params.id)

	return (
		<div className="flex flex-1 flex-col h-full overflow-hidden">
			<h1 className="mb-2 text-xl font-extrabold tracking-tight lg:text-2xl">
				General Section
				<pre className="text-sm">{JSON.stringify(org.data, null, 2)}</pre>
			</h1>
		</div>
	)
}
