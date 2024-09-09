import { date, json } from "./scalars"
import { Resolvers } from "./types"

const helloQuery = () => "hello! 🚀"

export const createResolvers = (): Resolvers => {
	return {
		JSON: json(),
		Date: date(),
		Query: {
			hello: helloQuery,
		},
	}
}
