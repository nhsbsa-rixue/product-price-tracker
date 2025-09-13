import dotEnv from "dotenv";

dotEnv.config();

export default {
  APP_NAME: process.env.APP_NAME || "APP_NAME",
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 8000,
  CONTEXT_PATH: "/",
  LOG_LEVEL: process.env.LOG_LEVEL?.toLowerCase() || "info",
};
