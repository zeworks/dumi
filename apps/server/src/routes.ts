import { createFastifyGraphQL } from "./adapters/graphql"
import type { AppInstance } from "./engine/app"

export default (app: AppInstance) =>
	(routes: Array<(instance: AppInstance) => void>) => {
		createFastifyGraphQL(app)

		app.register((app, _, done) => {
			routes.map((r) => r(app))
			done()
		})

		return app
	}
