import {
	CreateUserContractInput,
	CreateUserContractOutput,
} from "@dumi/zod/contracts/user"
import { Organization, User } from "@dumi/zod/schemas"

export type UserRepository = {
	create: (
		user: CreateUserContractInput
	) => Promise<CreateUserContractOutput | null>
	fetchId: (id: number) => Promise<User | null>
	fetchEmail: (email: string) => Promise<User | null>
	fetchOrganizations: (userId: number) => Promise<Organization[] | null>
}
