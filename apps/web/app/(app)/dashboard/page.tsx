import { EmptyContent } from "@/components/empty-content"
import { getServerSession } from "next-auth"

export default async function DashboardPage() {
	// const token =
	// 	"eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..-TUjE2nGalX4Hr-H.tWcHmGyO5gFSNSZ3PMwYabh6_mGvGXAvnmNjTsrau_FmvI7Bzv3gtKwbn1Fjnf8yNRre9iDpCnjg8E9RSeSZ8rciFeqLTknaQlpJt-d2M2b1aR77GghG3fEtYIwgRZy_zAY4aXkqBftI4Ng-pzpCcRmIQWqJrInQ6aOqkhWoq4VSSNrB4-Vb5PhpGigEH0y3ZdCzBLfqzztIed37E44zVA4yaZR7zFffxhw1HUWB2YXcOih6HU1wf3hwAt9Yv5IKQ8cCe9O1AACJbv4fSvRMCoYCPmRntjZN8cOfLMgANA.6SqAsIhXHc3xOfxlh8snHg"

	// await fetch("http://localhost:4000/users", {
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// })
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		console.log(data)
	// 	})
	// 	.catch((err) => {
	// 		console.error(err)
	// 	})

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
