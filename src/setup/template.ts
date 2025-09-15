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
 const results = new Set<string>();
  const source = path.join(__dirname, "../pages");

  const scan = (dir: string) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath); // Recursively scan subdirectories
      } else if (entry.isFile() && entry.name.endsWith(".njk")) {
        results.add(dir); // Add the folder containing .njk file
      }
    });
  };

  scan(source);

  console.log("Template folders found:", results);

  // Remove duplicates
  return Array.from(results);
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

  const pageDirs = getPageFolders();

  return [...templatePaths, ...pageDirs];
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
  env.addGlobal("getRequestUri", getRequestUri);
 
  // Add all globals from config
  env.addGlobal("APP_NAME", config.APP_NAME);
  env.addGlobal("CONTEXT_PATH", config.CONTEXT_PATH);

  // Set the view engine to Nunjucks
  app.set("view engine", "njk");
};

export default setupTemplate;
