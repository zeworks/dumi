import { ZodSchema } from "zod"

type ValidationZodSchemaResponse =
	| {
			type: "success"
	  }
	| {
			type: "error"
			error: any
	  }

export const validateZodSchema = (
	schema: ZodSchema,
	data: any
): ValidationZodSchemaResponse => {
	const validation = schema.safeParse(data)

	if (!validation.success)
		return {
			type: "error",
			error: (validation as any).error,
		}

	return {
		type: "success",
	}
}
