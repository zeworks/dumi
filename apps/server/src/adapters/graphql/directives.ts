import { verify } from "@dumi/crypto/jwt"
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils"
import { GraphQLSchema } from "graphql"
import { repository } from "../../repositories/user.prisma"

export const authDirectiveTransformer = (
	schema: GraphQLSchema
): GraphQLSchema => {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			const hasAuthDirective = getDirective(schema, fieldConfig, "auth")

			if (hasAuthDirective) {
				const { resolve } = fieldConfig
				fieldConfig.resolve = async (parent, args, context, info) => {
					const authorization = context?.reply?.request?.headers?.authorization
					if (!authorization) throw new Error("Authorization header is missing")

					const token = authorization.includes("Bearer")
						? authorization.replace("Bearer ", "")
						: authorization

					try {
						const jwt_decoded = verify(token) as any

						if (!jwt_decoded) throw new Error("Invalid token")

						const repo = await repository.fetchId(jwt_decoded.id)

						if (!repo) throw new Error("User not found")

						// if user is not active, should throw unauthorized error
						if (
							jwt_decoded &&
							(jwt_decoded.status !== "ACTIVE" || repo?.status !== "ACTIVE")
						)
							throw new Error("Your account is not active")

						delete jwt_decoded?.password

						context._context = {
							...context._context,
							...jwt_decoded,
							access_token: token,
						}
						return resolve?.call(this, parent, args, context, info)
					} catch (error) {
						throw error || new Error("Unauthorized")
					}
				}
			}
			return fieldConfig
		},
	})
}
