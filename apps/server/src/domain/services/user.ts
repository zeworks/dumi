import { Organization, User } from "@dumi/zod/schemas"
import { UserRepository } from "../repositories/user"
import {
	CreateUserContractInput,
	CreateUserContractOutput,
} from "@dumi/zod/contracts/user"

export type FetchUserOrganizationsService = (
	repository: UserRepository
) => (user_id: number) => Promise<Organization[] | null>

export type FetchUserEmailService = (
	repository: UserRepository
) => (email: string) => Promise<User | null>

export type FetchUserIdService = (
	repository: UserRepository
) => (id: number) => Promise<User | null>

export type CreateUserService = (
	repository: UserRepository
) => (user: CreateUserContractInput) => Promise<CreateUserContractOutput | null>
