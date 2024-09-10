import { Building, Home } from "lucide-react"

export type NavigationMenu = {
	url: string
	icon: any
	label: string
}

const menu: NavigationMenu[] = [
	{
		url: "/dashboard",
		icon: Home,
		label: "Dashboard",
	},
	{
		url: "/organizations",
		icon: Building,
		label: "Organizations",
	},
]
export default menu
