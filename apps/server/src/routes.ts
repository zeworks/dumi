import type { AppInstance } from "./engine/app"

export default (app: AppInstance) =>
	(routes: Array<(instance: AppInstance) => void>) => {
		app.register((app, _, done) => {
			routes.map((r) => r(app))
			done()
		})

		return app
	}
