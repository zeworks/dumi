import { Authentication } from "common/lib/schemas/auth"

export type Context = Omit<Authentication, "password">
