import fs from "fs";
import express from "express";
import nunjucks from "nunjucks";
import config from "../config";
import path from "path";

import { getRequestUri } from "../utils";

/**
 * Get all the folders containing .njk templates in the pages folder
 */
const getPageFolders = () => {
 const results: string[] = [];
  const source = path.join(__dirname, "../../src/pages");

  const scan = (dir: string) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath); // Recursively scan subdirectories
      } else if (entry.isFile() && entry.name.endsWith(".njk")) {
        results.push(dir); // Add the folder containing .njk file
      }
    });
  };

  scan(source);

  // Remove duplicates
  return Array.from(new Set(results));
};

/**
 * Get all the template paths for Nunjucks
 * 
 * contains: 
 * 1. nhsuk-frontend package
 * 2. base template in the template folder
 * 3. all the subdirectories in the pages folder 
 * 
 */
const getTemplatePaths = () => {
  const templatePaths = [
    path.join(__dirname, "../../src/template"),
    path.join(__dirname, "../../node_modules/nhsuk-frontend/packages"),
  ];

  const subDirs = getPageFolders();

  return [...templatePaths, ...subDirs];
};


  /**
   * Static file paths
   * Contains:
   * 1. public folder
   * 2. nhsuk-frontend package
   */
  const publicPaths = [
    path.join(__dirname, "../../public"),
    path.join(__dirname, "../../node_modules/nhsuk-frontend/dist"),

  ];

const setupTemplate = (app: App) => {
  // Serve static files from the public directory
  publicPaths.forEach((publicPath) => {
    app.use(getRequestUri(), express.static(publicPath));
  });

  // Set the path to the page template and macros
  const env = nunjucks.configure(getTemplatePaths(), {
    autoescape: true,
    express: app,
  });

  // Add filters 
  env.addFilter("getRequestUri", getRequestUri);
 
  // Add all globals from config
  env.addGlobal("APP_NAME", config.APP_NAME);
  env.addGlobal("CONTEXT_PATH", config.CONTEXT_PATH);

  // Set the view engine to Nunjucks
  app.set("view engine", "njk");
};

export default setupTemplate;
