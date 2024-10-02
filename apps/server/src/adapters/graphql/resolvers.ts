import { date, json } from "./scalars"
import { Resolvers } from "./types"
import Organizations from "./resolvers/organizations"

export const createResolvers = (): Resolvers => {
	return {
		JSON: json(),
		Date: date(),
		Query: {
			getOrganization: async (_, req) =>
				Organizations().getOrganization(req.id) as any,
		},
	}
}
