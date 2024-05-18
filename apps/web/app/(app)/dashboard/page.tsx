import { auth } from "@/app/api/auth/[...nextauth]/auth"
import { EmptyContent } from "@/components/empty-content"
import { getServerSession } from "next-auth"

export default async function DashboardPage() {
	return (
		<div className="flex flex-1 flex-col h-full">
			<h1 className="mb-2 text-xl font-extrabold tracking-tight lg:text-2xl">
				Dashboard
			</h1>
			<EmptyContent
				title="No data"
				message="There is no data to display yet."
				buttonText="Add data"
			/>
		</div>
	)
}
