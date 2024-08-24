import { AppInstance } from "../../engine/app"
import mercurius from "mercurius"
import { loadSchemaSync } from "@graphql-tools/load"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import path from "path"
import { Resolvers } from "./types"
import { GraphQLScalarType, Kind } from "graphql"
import { authDirectiveTransformer } from "./directives"

// load schema file
const schema = loadSchemaSync(path.join(__dirname, "schema.graphql"), {
	loaders: [new GraphQLFileLoader()],
})

// defined resolvers
const resolvers: Resolvers = {
	JSON: new GraphQLScalarType({
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
	}),
	Date: new GraphQLScalarType({
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
	}),
	// Query: {
	// 	// getUser: async (_, req) => {
	// 	// 	const response = await userFetchIdControllerFactory()({
	// 	// 		params: { id: req.id },
	// 	// 	})

	// 	// 	if (response.type === "error") throw new Error(response.error.message)

	// 	// 	return response
	// 	// },
	// },
}

const executableSchema = authDirectiveTransformer(
	makeExecutableSchema({
		typeDefs: schema,
		resolvers,
	})
)

export const createFastifyGraphQL = (app: AppInstance) => {
	return app.register(mercurius, {
		schema: executableSchema,
		graphiql: true,
	})
}
