import fs from "fs";
import express from "express";
import nunjucks from "nunjucks";
import config from "../config";
import { getRequestUri } from "../utils";

/**
 * Get all the subdirectories in the pages folder
 */
const getSubDirectories = (source: string) => {
  return fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => source + "/" + dirent.name + "/template");
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
    "src/template",
    "./node_modules/nhsuk-frontend/packages",
  ];

  const subDirs = getSubDirectories("src/pages");

  return [...templatePaths, ...subDirs];
};


const setupTemplate = (app: App) => {

  /**
   * Static file paths
   * Contains:
   * 1. public folder
   * 2. nhsuk-frontend package
   */
  const publicPaths = [
    "./public",
    "./node_modules/nhsuk-frontend/dist",
  ];

  publicPaths.forEach((publicPath) => {
    app.use(getRequestUri(), express.static(publicPath));
  });

  // Set the path to the page template and macros
  const templatePaths = getTemplatePaths();

  const env = nunjucks.configure(templatePaths, {
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
