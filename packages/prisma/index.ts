import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

export default db
export type Prisma = typeof db
