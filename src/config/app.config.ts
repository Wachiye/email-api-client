import dotenv from "dotenv-safe";

dotenv.config();

export type AppEnv = "development" | "dev" | "production" | "prod";

interface AppConfig {
  env: AppEnv;
  port: number;
  appName: string;
  corsOrigin: string[];
  jwt: {
    secret: string;
    audience: string;
    issuer: string;
    /** @description in minutes */
    expiresIn: number;
    refresh: {
      secret: string;
      /** @description in hours */
      expiresIn: number;
    };
  };

  mongo: {
    uri: string;
  };
  logs: string;
}

const requiredEnvVariables = [
  "NODE_ENV",
  "PORT",
  "APP_NAME",
  "JWT_SECRET",
  "JWT_AUDIENCE",
  "JWT_ISSUER",
  "JWT_EXPIRATION_MINUTES",
  "JWT_REFRESH_TOKEN_SECRET",
  "JWT_REFRESH_EXPIRATION_HOURS",
  "MONGO_URI",
  "CORS_ORIGIN",
];

requiredEnvVariables.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

export const appConfig: AppConfig = {
  appName: process.env.APP_NAME as string,

  env: process.env.NODE_ENV as AppEnv,
  port: parseInt(process.env.PORT as string, 10),
  corsOrigin: (process.env.CORS_ORIGIN as string).split(","),
  jwt: {
    secret: process.env.JWT_SECRET as string,
    audience: process.env.JWT_AUDIENCE as string,
    issuer: process.env.JWT_ISSUER as string,
    expiresIn: parseInt(process.env.JWT_EXPIRATION_MINUTES as string, 10),
    refresh: {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
      expiresIn: parseInt(
        process.env.JWT_REFRESH_EXPIRATION_HOURS as string,
        10
      ),
    },
  },

  mongo: {
    uri:
      process.env.NODE_ENV === "test"
        ? (process.env.MONGO_URI_TESTS as string)
        : (process.env.MONGO_URI as string),
  },
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
};

export default appConfig;
