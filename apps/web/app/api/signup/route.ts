import { NextRequest, NextResponse } from "next/server"
import { CREATE_USER_CONTRACT_INPUT } from "@dumi/zod/contracts/user"

// TODO: Implement signup logic
async function handler(request: NextRequest) {
	// validate if the request body is valid
	const { body } = request
	console.log(request)

	const validation = CREATE_USER_CONTRACT_INPUT.safeParse(body)
	console.log(JSON.stringify(validation, null, 2))

	return NextResponse.json({
		message: "Signup route handler",
	})
}

export { handler as POST }
