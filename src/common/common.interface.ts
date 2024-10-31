import type { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  public status!: number;
  public message!: string;
  public reason?: string;

  constructor(message: string, opts?: { reason?: string; status?: number }) {
    super(message);
    this.reason = opts?.reason;
    this.status = opts?.status ?? 500;
  }
}

export interface IRequest extends Request {
  
}

export interface IResponse extends Response {
  success: <T>(data: T, message?: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (message: string, error: any | unknown) => void;
}

export type INext = NextFunction;

export interface RouteDefinition {
  path: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  isPrivate?: boolean;
  handler: (req: IRequest, res: IResponse, next: INext) => void;
}

export default abstract class BaseController {
  public basePath!: string;
  public version?: string;
  public abstract routes(): RouteDefinition[];
}
