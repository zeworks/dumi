import {
	CreateUserContractInput,
	CreateUserContractOutput,
	FetchAllUserContractOutput,
} from "common/lib/contracts/user"
import { User } from "common/lib/schemas/user"

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
