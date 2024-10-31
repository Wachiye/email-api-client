/* eslint-disable @typescript-eslint/no-explicit-any */
import WSClient from './wsClient';

import WebSocket from "ws";

export type EventName = "unknown" | "ping" | "new-email" | "read-email";

export interface BaseEvent {
  eventName: EventName;
  timestamp: number;
}

export interface BaseReplyData<T = any> {
  event: EventName;
  broadcast?: boolean;
  data?: T;
}

export interface ReadEmailEvent extends BaseEvent {
  emailId: string;
  read: boolean;
}

export type EventPayload = ReadEmailEvent;
/* | OtherEventTypes */

export type UserSocketMap = Record<string, WebSocket>;

export interface SocketState {
  socketClient: WSClient | null;
  ws: WebSocket;
  emit: (data: EventPayload) => any;
  disconnect: () => void;
}

