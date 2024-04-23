import {
	CreateUserContractInput,
	CreateUserContractOutput,
	FetchAllUserContractOutput,
	FetchEmailUserContractInput,
	FetchEmailUserContractOutput,
	FetchIdUserContractInput,
	FetchIdUserContractOutput,
} from "@dumi/zod/contracts/user"
import { User } from "@dumi/zod/schemas"

export type UserRepository = {
	create: UserCreateRepository
	fetchEmail: UserFetchEmailRepository
	fetchAll: UserFetchAllRespository
	fetchId: UserFetchIdRepository
}

export type UserCreateRepository = (
	data: CreateUserContractInput
) => Promise<CreateUserContractOutput | null>

export type UserFetchEmailRepository = (
	input: FetchEmailUserContractInput
) => Promise<FetchEmailUserContractOutput | null>

export type UserFetchAllRespository = () => Promise<FetchAllUserContractOutput>
export type UserFetchIdRepository = (
	data: FetchIdUserContractInput
) => Promise<FetchIdUserContractOutput | null>
