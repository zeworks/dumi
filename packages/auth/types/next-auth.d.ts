import type { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: Omit<DefaultSession["user"], "id"> & { id?: number; image?: string }
		accessToken: string
	}

	interface User extends Omit<DefaultUser, "id"> {
		id: number
	}
}
