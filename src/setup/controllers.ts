import express from "express";
import { validator } from "../validator";
import fs from "fs";
import path from "path";


const router = express.Router();

const derivePath = (filePath: string) => {
  const parts = filePath.split(path.sep);
  const idx = parts.lastIndexOf("controllers");
  const segments = parts.slice(idx + 1, parts.length - 1); // folder path
  return "/" + segments.join("/"); // simplistic; extend for dynamic params
};

const walk = (dir: string, router: express.Router) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, router);
    else if (entry.name.endsWith("controller.ts") || entry.name.endsWith("controller.js")) {

      console.log(`Loading controller from file: ${full}`);
      const mod = require(full);
      const meta = mod.default || {};
      const basePath = meta.basePath || derivePath(full);


      if (typeof mod["Get"] === "function") {
        const schema = mod["GetSchema"] || [];
        router.get(`${basePath}/:id`, schema, validator, mod["Get"]);
      }

      if (typeof mod["List"] === "function") {
        router.get(basePath, mod["List"]);
      }

      if (typeof mod["Post"] === "function") {
        const schema = mod["PostSchema"] || [];
        router.post(basePath, schema, validator, mod["Post"]);
      }

      if (typeof mod["Put"] === "function") {
        const schema = mod["PutSchema"] || [];
        router.put(`${basePath}/:id`, schema, validator, mod["Put"]);
      }

      if (typeof mod["Delete"] === "function") {
        const schema = mod["DeleteSchema"] || [];
        router.delete(`${basePath}/:id`, schema, validator, mod["Delete"]);
      }

      if (typeof mod["Patch"] === "function") {
        const schema = mod["PatchSchema"] || [];
        router.patch(`${basePath}/:id`, schema, validator, mod["Patch"]);
      }


    }
  }
};

export function setupAutoRoutes(app: express.Application) {

  const baseDir = path.join(__dirname, "..", "controllers");



  walk(baseDir, router);

  app.use(router);



}

export default setupAutoRoutes;
