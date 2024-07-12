import { cookies } from "next/headers"
import env from "@dumi/env"
import { HttpResponse } from "@dumi/protocols"

type RequestOptions<T = any> = RequestInit & {
	body?: T
}

// it needs to be typescript
export default async function fetchInstance<Response = any, Variables = any>(
	url: string,
	options?: RequestOptions<Variables>
): Promise<HttpResponse<Response>> {
	const token = cookies().get("next-auth.session-token")

	// Set default headers
	const headers: Record<string, any> = {
		"Content-Type": "application/json",
		...options?.headers,
	}

	// if a token exists, add it to the headers
	if (token) {
		headers["Authorization"] = `Bearer ${token.value}`
	}

	const _url = `${env.NEXTAPI_URL}/${url}`

	try {
		const response: any = await fetch(_url, {
			...options,
			headers,
		})

		// parse the response as JSON
		const data = await response.json()

		// handle errors
		if (!response.ok) {
			throw data
		}

		return data
	} catch (error) {
		console.log("error fetch", error)
		throw error
	}
}
