import express from "express";
import { validator } from "../validator";
import fs from "fs";
import path from "path";
import logger from "../logger";


const router = express.Router();

/** 
 * Derives a base path from the file path.
 * E.g., src/controllers/users/userController.ts -> /users
 */
const derivePath = (filePath: string) => {
  const parts = filePath.split(path.sep);
  const idx = parts.lastIndexOf("controllers");
  const segments = parts.slice(idx + 1, parts.length - 1); // folder path
  return "/" + segments.join("/"); // simplistic; extend for dynamic params
};

const scanningControllers = (baseFolder: string, router: express.Router) => {
  for (const entry of fs.readdirSync(baseFolder, { withFileTypes: true })) {
    const subControllerFolder = path.join(baseFolder, entry.name);

    if (entry.isDirectory()) {
      scanningControllers(subControllerFolder, router);
    } 

    else if (entry.name.endsWith("controller.ts") || entry.name.endsWith("controller.js")) {

      const mod = require(subControllerFolder);
      const meta = mod.default || {};
      const path = meta.path || derivePath(subControllerFolder);


      if (typeof mod["Get"] === "function") {
        const schema = mod["GetSchema"] || [];
        router.get(`${path}/:id`, schema, validator, mod["Get"]);
      }

      if (typeof mod["List"] === "function") {
        router.get(path, mod["List"]);
      }

      if (typeof mod["Post"] === "function") {
        const schema = mod["PostSchema"] || [];
        router.post(path, schema, validator, mod["Post"]);
      }

      if (typeof mod["Put"] === "function") {
        const schema = mod["PutSchema"] || [];
        router.put(`${path}/:id`, schema, validator, mod["Put"]);
      }

      if (typeof mod["Delete"] === "function") {
        const schema = mod["DeleteSchema"] || [];
        router.delete(`${path}/:id`, schema, validator, mod["Delete"]);
      }

      if (typeof mod["Patch"] === "function") {
        const schema = mod["PatchSchema"] || [];
        router.patch(`${path}/:id`, schema, validator, mod["Patch"]);
      }


    }
  }
};

export function setupAutoRoutes(app: express.Application) {

  const controllerBaseFolder = path.join(__dirname, "..", "controllers");

  scanningControllers(controllerBaseFolder, router);

  app.use(router);

  router.stack.forEach((layer: any) => {
  if (layer.route) {
    const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
    logger.debug(`${methods} ${layer.route.path}`);
  }
});


}

export default setupAutoRoutes;
