import express from "express";
import { validator } from "../validator";
import fs from "fs";
import path from "path";
import logger from "../logger";
import { getRequestUri } from "../utils"


let pageList = [{}];


/**
 * redirect with the contextPath
 */
const redirectPageTo = (req, res, next) => {
  res.redirectPageTo = (page) => {
    res.redirect(getRequestUri(page));
  };
  next();
};


/** 
 * Derives a base path from the file path.
 * E.g., src/pages/dob/page.ts -> /dob
 */
const derivePath = (filePath: string) => {
  const parts = filePath.split(path.sep);
  const idx = parts.lastIndexOf("pages");
  const segments = parts.slice(idx + 1, parts.length - 1); // folder path
  return segments.join("/"); // simplistic; extend for dynamic params
};

const scanningPages = (baseFolder: string, router: express.Router) => {

  
  // Recursively scan the pages directory
  for (const entry of fs.readdirSync(baseFolder, { withFileTypes: true })) {
    const subPageFolder = path.join(baseFolder, entry.name);

    if (entry.isDirectory()) {
      scanningPages(subPageFolder, router);
    } 

    else if (entry.name.endsWith("page.ts") || entry.name.endsWith("page.js")) {

      const mod = require(subPageFolder);
      const meta = mod.default || {};
      const path = meta.path || derivePath(subPageFolder);

      pageList.push({
        path,
        heading: meta.heading || path
      });


      if (typeof mod["get"] === "function") {
        const schema = mod["getSchema"] || [];
        router.get(path, schema, validator, mod["get"]);
      }

      if (typeof mod["post"] === "function") {
        const schema = mod["postSchema"] || [];
        router.post(path, schema, validator, mod["post"]);
      }


    }
  }

};

const setupAutoPages = (app: express.Application) => {
  const router = express.Router();


  const controllerBaseFolder = path.join(__dirname, "..", "pages");
  scanningPages(controllerBaseFolder, router);

  router.get("/", (req, res) => {
      res.render("home", { pageList });
  });
  

  app.use(redirectPageTo);

  app.use(getRequestUri(), router);

  router.stack.forEach((layer: any) => {
  if (layer.route) {
    const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
    logger.debug(`${methods} ${layer.route.path}`);
  }
});



}

export default setupAutoPages;
