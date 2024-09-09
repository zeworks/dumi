import { GraphQLScalarType, Kind } from "graphql"

export const date = () =>
	new GraphQLScalarType({
		name: "Date",
		description: "Custom Date scalar type",
		serialize(value) {
			return value instanceof Date ? value.toISOString() : null // Convert outgoing Date to ISO string
		},
		parseValue(value) {
			return typeof value === "string" ? new Date(value) : null // Convert incoming string to Date
		},
		parseLiteral(ast) {
			return ast.kind === Kind.STRING ? new Date(ast.value) : null // Convert hard-coded AST string to Date
		},
	})

export const json = () =>
	new GraphQLScalarType({
		name: "JSON",
		description: "Custom scalar for JSON objects",
		serialize(value) {
			return value // value sent to the client
		},
		parseValue(value) {
			return value // value from the client
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.OBJECT) {
				return (ast as any).value
			}
			return null
		},
	})
