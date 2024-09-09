import { AppInstance } from "../../engine/app"
import mercurius from "mercurius"
import { loadSchemaSync } from "@graphql-tools/load"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import path from "path"
import { authDirectiveTransformer } from "./directives"
import { createResolvers } from "./resolvers"

const schema = loadSchemaSync(path.join(__dirname, "schema.graphql"), {
	loaders: [new GraphQLFileLoader()],
})

const executableSchema = authDirectiveTransformer(
	makeExecutableSchema({
		typeDefs: schema,
		resolvers: createResolvers(),
	})
)

export const createFastifyGraphQL = (app: AppInstance) => {
	return app.register(mercurius, {
		schema: executableSchema,
		graphiql: true,
	})
}
