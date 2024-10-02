import { HttpResponse } from "@dumi/protocols"
import { Organization, User } from "@dumi/zod/schemas"

export type Resolvers = {
	[key: string]: any
	Query: {
		getOrganization: GraphQLRequest<{ id: string }, HttpResponse<Organization>>
	}
}

type GraphQLRequest<Request = any, Response = any> = (
	_: any,
	req: Request,
	ctx: User
) => Promise<Response>
