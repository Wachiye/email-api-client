import { RequestHandler, Router } from 'express';
import { RouteDefinition } from './common/common.interface';
import { EmailController } from './components/email/controllers';

function registerControllerRoutes(routes: RouteDefinition[]): Router {
	const controllerRouter = Router();
	routes.forEach((route) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const middlewares: RequestHandler[] = [];

		controllerRouter[route.method](
			route.path,
			...middlewares,
			route.handler as RequestHandler,
		);
	});
	return controllerRouter;
}

/**
 * Here, you can register routes by instantiating the controller.
 *
 */
export default function registerRoutes(): Router {
	const router = Router();

	// Define an array of controller objects
	const controllers = [new EmailController()];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	router.get('/', (_req, res, _next) => {
		res.status(200).json({
			success: true,
			message: 'Server is running',
			uptime: process.uptime(),
			timestamp: new Date().toISOString(),
		});
	});

	// Dynamically register routes for each controller
	controllers.forEach((controller) => {
		// each controller has version and basePath attribute and routes() method
		const route = `${controller.version ? `${controller.version}/` : ''}${
			controller.basePath
		}`;

		router.use(route, registerControllerRoutes(controller.routes()));
	});

	return router;
}
