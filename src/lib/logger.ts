import * as winston from "winston";

const { combine, timestamp, align, printf, colorize } = winston.format;

export type Logger = winston.Logger & {
  throwError: (error: unknown, message: string) => never;
};

const LOG_LEVELS = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const loggerFormat = printf(
  (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
);

const logger: Logger = winston.createLogger({
  levels: LOG_LEVELS,
  level: process.env.LOG_LEVEL?.toLowerCase() || "info",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    loggerFormat
  ),
  transports: [new winston.transports.Console()],
}) as Logger;

// Extend the logger to include the throwError method
logger.throwError = (error: unknown, message: string): never => {
  logger.error(`${message}:${error}`);
  throw error;
};

export default logger;
