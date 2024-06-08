import { NextRequest, NextResponse } from "next/server"
import { CREATE_USER_CONTRACT_INPUT } from "@dumi/zod/contracts/user"
import { encrypt } from "@dumi/crypto"
import db from "@/lib/db"
import { HttpErrorResponse, HttpSuccessResponse } from "@dumi/protocols"

async function handler(request: NextRequest) {
	try {
		const payload = await request.json()

		// validate if the request body is valid
		const validatedPayload = CREATE_USER_CONTRACT_INPUT.safeParse(payload)

		if (!validatedPayload.success) {
			return NextResponse.json({
				type: "error",
				status: 400,
				error: {
					message: "Error validating request body",
					detail: validatedPayload.error.flatten(),
				},
			})
		}

		const user = await db.user.findUnique({
			where: { email: validatedPayload.data.email },
		})

		if (user) {
			return NextResponse.json({
				type: "error",
				status: 400,
				error: {
					message: "Sign up error",
					detail: "The user with the email provided already exists",
				},
			})
		}

		const encryptPassword = await encrypt(validatedPayload.data.password!)

		const { password, ...newUser } = await db.user.create({
			data: {
				name: validatedPayload.data.name,
				email: validatedPayload.data.email,
				password: encryptPassword,
			},
		})

		return NextResponse.json({
			type: "success",
			status: 200,
			data: newUser,
		} as HttpSuccessResponse)
	} catch (error) {
		return NextResponse.json({
			type: "error",
			status: 500,
			error: {
				message: "Internal server error",
				detail: error,
			},
		} as HttpErrorResponse)
	}
}

export { handler as POST }
