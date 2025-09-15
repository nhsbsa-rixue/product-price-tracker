import express from "express";
import { validator } from "../validator";
import fs from "fs";
import path from "path";
import logger from "../logger";
import { getRequestUri } from "../utils"


let pageList: { path: string; heading: string }[] = [];


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
 * Middleware to redirect paths ending with a trailing slash (except root "/") to their non-slash version.
 */
const removeTrailingSlash = (req, res, next) => {
  if (req.path.length > 1 && req.path.endsWith("/")) {
    const newPath = req.path.slice(0, -1);
    return res.redirect(301, newPath + (req.url.slice(req.path.length) || ""));
  }
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


      if (typeof mod["Get"] === "function") {
        const schema = mod["getSchema"] || [];

        console.log("Registering page:", getRequestUri(path));
        router.get(getRequestUri(path), schema, validator, mod["Get"]);
      }

      if (typeof mod["Post"] === "function") {
        const schema = mod["postSchema"] || [];
        router.post(getRequestUri(path), schema, validator, mod["Post"]);
      }


    }
  }

};

const setupAutoPages = (app: express.Application) => {
  const router = express.Router();


  const controllerBaseFolder = path.join(__dirname, "..", "pages");
  scanningPages(controllerBaseFolder, router);

  router.get(getRequestUri(),  (req, res) => {
      res.render("home", { pageList });
  });
  

  app.use(redirectPageTo);

  app.use(removeTrailingSlash);

  app.use(router);

  router.stack.forEach((layer: any) => {
  if (layer.route) {
    const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
    logger.debug(`${methods} ${layer.route.path}`);
  }
});



}

export default setupAutoPages;
