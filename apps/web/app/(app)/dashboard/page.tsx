import { EmptyContent } from "@/components/empty-content"

export default async function DashboardPage() {
	return (
		<div className="flex flex-1 flex-col h-full">
			<h1 className="mb-2 text-xl font-extrabold tracking-tight lg:text-2xl">
				Dashboard
			</h1>
			<EmptyContent
				title="Feature coming soon"
				message="This feature is not ready yet. Stay tuned for updates!"
				buttonText="Notify me"
			/>
		</div>
	)
}
