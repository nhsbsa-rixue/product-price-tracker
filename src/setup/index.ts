import setupParser from "./parser";
import setupController from "./controllers";
import setupDBClient from "./db-client";
import setupErrorHandlers from "./error-handler";

/**
 * 1. Configure to load heavy sync tasks once
 * 2. Register router here so handler can reuse those task
 *
 * @param {ExpressApp} app
 *
 */
export default (app: App) => {
  setupParser(app);
  setupDBClient(app);
  setupController(app);
  setupErrorHandlers(app);
};
