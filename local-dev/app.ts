import express from "express";
import setup from "../src/setup";
import logger from "../src/logger";
import config from "../src/config";

const { PORT, APP_NAME } = config;
const app = express();
setup(app);

app.listen(PORT, () => {
  logger.info(`${APP_NAME} listening at http://localhost:${PORT}`);
});

export default app;