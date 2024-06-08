import env from "@dumi/env"
import { verify as jwtVerify, sign as jwtSign } from "jsonwebtoken"

export const verify = (token: string) =>
	jwtVerify(token, env.JWT_SECRET || "", { algorithms: ["HS256"] })

export const sign = (payload: any) =>
	jwtSign(payload, env.JWT_SECRET || "", {
		expiresIn: "1d",
		algorithm: "HS256",
	})
