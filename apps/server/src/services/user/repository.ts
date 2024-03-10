import {
	CreateUserContractInput,
	CreateUserContractOutput,
	FetchAllUserContractOutput,
} from "@dumi/zod/contracts/user"
import { User } from "@dumi/zod/schemas/user"

export type UserRepository = {
	create: UserCreateRepository
	fetchEmail: UserFetchEmailRepository
	fetchAll: UserFetchAllRespository
	fetchId: UserFetchIdRepository
}

export type UserCreateRepository = (
	data: CreateUserContractInput
) => Promise<CreateUserContractOutput | null>

export type UserFetchEmailRepository = (email: string) => Promise<User | null>
export type UserFetchAllRespository = () => Promise<FetchAllUserContractOutput>
export type UserFetchIdRepository = (id: string) => Promise<User | null>
