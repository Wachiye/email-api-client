/* eslint-disable @typescript-eslint/no-unused-vars */
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import logger from '../lib/logger';
import {
	BaseReplyData,
	EventName,
	EventPayload,
	ReadEmailEvent,
	UserSocketMap,
} from './socket.interface';

import { readEmailHandler } from './handlers/read-email.handler';
import { AppError } from '../common/common.interface';

const sockets: UserSocketMap = {};

export let webSocket: WebSocketServer;

function getQueryParams(relativeUrl: string) {
	const baseUrl = 'http://example.com'; // Dummy base URL
	const url = new URL(relativeUrl, baseUrl);
	const params = new URLSearchParams(url.search);
	return params;
}

export const webSocketServer = (server: http.Server) => {
	const wss = new WebSocketServer({ server });

	wss.on('connection', async (ws: WebSocket, req) => {
		const params = getQueryParams(req.url as string);

		const sessionId = params.get('sessionId');

        if(!sessionId){
            throw new AppError("Invalid session id")
        }

		try {
			
			
			sockets[sessionId] = ws;

			ws.on('message', async (message) => {
				const parsedMessage = JSON.parse(message.toString());
				const data = await handlerWSEvent(
					ws,
					sessionId,
					parsedMessage.event,
					parsedMessage.data,
				);

				if (data.broadcast) {
					emitBroadcast(data);
				} else {
					ws.send(JSON.stringify(data));
				}
			});

			ws.on('close', () => {
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete sockets[sessionId];
				
			});
		} catch (error) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const err = error as any;
			ws.close(4001, err.message ?? 'Invalid Authorization Token');
		}

		return wss;
	});

	webSocket = wss;
	return wss;
};

export const emitBroadcast = async (data: BaseReplyData) => {
	const message = JSON.stringify(data);
	webSocket.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
};

export const emitMessage = async (sessionId: string, data: BaseReplyData) => {
	const message = JSON.stringify(data);
	const client = sockets[sessionId];

	if (client.readyState === WebSocket.OPEN) {
		client.send(message);
	}
};

export const handlerWSEvent = (
	ws: WebSocket,
	sessionId: string,
	event: EventName,
	data: EventPayload,
): Promise<BaseReplyData> => {
	switch (event) {
		case 'ping':
			return Promise.resolve({
				event,
				broadcast: false,
				data: { isActive: ws.readyState === WebSocket.OPEN },
			});

		case 'read-email':
			return readEmailHandler(sessionId, data as ReadEmailEvent);
		
		default:
			logger.warn(`Unhandled WS event: ${event}`);
			return Promise.resolve({
				event: 'unknown',
				broadcast: false,
				data: {},
			});
	}
};