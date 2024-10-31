/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { EventName, EventPayload } from "../types/socket";

interface SocketServiceOptions {
  url: string;
  sessionId: string;
}

class SocketService {
  public ws!: WebSocket;
  private sessionId: string;
  private url: string;
  private pingIntervalId!: any;
  private messageQueue: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private eventHandlers: { [key: string]: Function[] } = {};

  constructor({ url, sessionId }: SocketServiceOptions) {
    this.url = url;
    this.sessionId = sessionId;
    this.connect();
  }

  public connect() {
    this.ws = new WebSocket(`${this.url}?sessionId=${this.sessionId}`);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      // Send any queued messages
      while (this.messageQueue.length > 0) {
        this.ws.send(this.messageQueue.shift()!);
      }
    };

    this.ws.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data as string); // {event, data}
      this.handleMessage(parsedMessage);
    };

    this.ws.onclose = (event) => {
      console.warn(`WebSocket disconnected: ${event.code} - ${event.reason}`);
      this.stopPing();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  public on(event: EventName, handler: Function) {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event].push(handler);
  }

  private handleMessage(message: { event: string; data: any }) {
    const handlers = this.eventHandlers[message.event];
    if (handlers) {
      handlers.forEach((handler) => handler(message.data));
    }
  }

  public send(data: EventPayload) {
    if (!data.timestamp) {
      data.timestamp = new Date().getTime();
    }
    const message = JSON.stringify({ event: data.eventName, data });

    if (this.ws.readyState !== WebSocket.OPEN) {
      this.messageQueue.push(message);
      if (this.ws.readyState === WebSocket.CLOSED) {
        this.connect();
      }
    } else {
      this.ws.send(message);
    }
  }

  public disconnect() {
    this.ws.close();
    this.stopPing();
  }

  public startPing() {
    this.pingIntervalId = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ event: 'ping' }));
      } else {
        this.connect();
      }
    }, 5000);
  }

  private stopPing() {
    if (this.pingIntervalId) {
      clearInterval(this.pingIntervalId);
    }
  }
}

export default SocketService;