"use client"
import routes from "@/config/routes"
import { redirect, useParams } from "next/navigation"

export default function Page(props: any) {
	const params = useParams<{ id: string }>()

	redirect(routes.organizationGeneral.replace("{id}", params.id))
}
