import { NextFunction, Request, Response } from "express";
import { AppError, INext, IRequest, IResponse } from "../common/common.interface";
import logger from "../lib/logger";

export const handlerWrapper = (
	req: Request,
	res: Response,
	next: NextFunction,
	handler: (...args: any) => any,
) => {
	const iReq = req as IRequest;
	const iRes = res as IResponse;
	const iNext = next as INext;

	handler(iReq, iRes, iNext);
};

export const requestHandler = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const iReq = req as IRequest;
		const iRes = res as IResponse;
		const iNext = next as INext;

		logger.info('Request Parsing');

		const baseUrl = `${req.protocol}://${req.headers.host}`;
		iReq.baseUrl = baseUrl;

		iRes.success = function <T>(data: T, message = 'Success') {
			res.status(200).json({
				success: true,
				message,
				data,
			});
		};

		iRes.error = function (message: string, error: unknown) {
			logger.error(`Error(${message}):${JSON.stringify(error)}`);

			const status =
				error instanceof AppError ? error.status ?? 500 : 500;

			res.status(status).json({
				success: false,
				message,
				code: status,
			});
		};

		iNext();
	} catch (error) {
		console.log(error);
		logger.error('Error passing request');
		next(error);
	}
};