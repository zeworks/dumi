import { HttpResponse } from "@dumi/protocols"
import { User } from "@dumi/zod/schemas"

export type Resolvers = {
	[key: string]: any
	// Query: {
	// 	getUser: GraphQLRequest<{ id: string }, HttpResponse<User>>
	// }
}

type GraphQLRequest<T = any, R = any> = (
	_: any,
	req: T,
	ctx: User
) => Promise<R>
