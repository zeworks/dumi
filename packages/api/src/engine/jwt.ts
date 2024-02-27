import jwtservice from "jsonwebtoken"
import env from "./env"

export const verify = (token: string) =>
	jwtservice.verify(token, env.JWT_SECRET)

export const sign = (payload: any) =>
	jwtservice.sign(payload, env.JWT_SECRET, { expiresIn: "1d" })
