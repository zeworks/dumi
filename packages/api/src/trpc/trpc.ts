import { initTRPC } from "@trpc/server"
import env from "../engine/env"

const t = initTRPC.create({
	isDev: env.MODE === "development",
})

export default t
