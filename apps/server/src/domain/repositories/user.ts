import {
	CreateUserContractInput,
	CreateUserContractOutput,
} from "@dumi/zod/contracts/user"
import { Organization, User } from "@dumi/zod/schemas"

export type UserRepository = {
	create: (
		user: CreateUserContractInput
	) => Promise<CreateUserContractOutput | null>
	fetchId: (id: string) => Promise<User | null>
	fetchEmail: (email: string) => Promise<User | null>
	fetchOrganizations: (userId: string) => Promise<Organization[] | null>
}
