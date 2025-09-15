import setupParser from "./parser";
import setupController from "./controllers";
import setupDBClient from "./db-client";
import setupErrorHandlers from "./error-handler";

import setupSecurity from "./security";
import setupTemplat from "./template";
import setupSession from "./session";
import setupLanguage from "./language";

import setupPages from "./pages";

/**
 * 1. Configure to load heavy sync tasks once
 * 2. Register router here so handler can reuse those task
 *
 * @param {ExpressApp} app
 *
 */
export default (app: App) => {

  setupSecurity(app);
  setupParser(app);

  setupSession(app);
  setupDBClient(app);

  setupTemplat(app);
  setupLanguage(app);

  setupController(app);
  setupPages(app);


  // make sure this is the last one
  setupErrorHandlers(app);


};
