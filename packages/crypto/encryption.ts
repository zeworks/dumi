import * as bcrypt from "bcrypt"

export const decrypt = (key: string, encryped_key: string) =>
	bcrypt.compare(key, encryped_key)

export const encrypt = (key: string) => bcrypt.hash(key, 8)
