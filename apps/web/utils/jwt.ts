import { sign, verify } from "@dumi/crypto/jwt"

export function generateToken(data: unknown): string {
	return sign(data)
}
