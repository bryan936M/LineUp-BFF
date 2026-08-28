const requireEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (!value) {
    throw new Error(`CRITICAL: Missing required environment variable "${key}"`);
  }

  return value;
};

export interface AppConfig {
  nodeEnv: string;
  port: number;
  database_url: string;
}

const NODE_ENV_KEY = "NODE_ENV";
const DEFAULT_NODE_ENV = "development";
const PORT_KEY = "PORT";
const DEFAULT_PORT = 3001;
const DATABASE_URL_KEY = "DATABASE_URL";
const DEFAULT_DATABASE_URL = "";

export const appConfig: AppConfig = {
  nodeEnv: process.env[NODE_ENV_KEY] ?? DEFAULT_NODE_ENV,
  port: Number(process.env[PORT_KEY] ?? DEFAULT_PORT),
  database_url: process.env[DATABASE_URL_KEY] ?? DEFAULT_DATABASE_URL,
};

export interface GoogleAuthConfig {
  clientId: string;
  clientSecret: string;
  callbackURL: string;
}

const GOOGLE_AUTH_CLIENT_ID_KEY = "GOOGLE_CLIENT_ID";
const GOOGLE_AUTH_CLIENT_SECRET_KEY = "GOOGLE_CLIENT_SECRET";
const GOOGLE_AUTH_CALLBACK_URL_KEY = "GOOGLE_CALLBACK_URL";

export const googleAuthConfig: GoogleAuthConfig = {
  clientId: requireEnvVar(GOOGLE_AUTH_CLIENT_ID_KEY),
  clientSecret: requireEnvVar(GOOGLE_AUTH_CLIENT_SECRET_KEY),
  callbackURL: requireEnvVar(GOOGLE_AUTH_CALLBACK_URL_KEY),
};
