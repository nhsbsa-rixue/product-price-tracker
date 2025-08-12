import express from "express";
import * as controllers from "../controllers";
import { validator } from "../validator";
import { CONSTANTS } from "../constants";

const router = express.Router();

const setupController = (app: App) => {
  Object.values(controllers).forEach(controller => {
    const { Path, Get, List, Post, Put, Delete, Schema = [], PutSchema, PostSchema } =
      controller;

    if (Get) {
      router.get(Path + CONSTANTS.PATH_WITH_ID, Get);
    }

    if (List) {
      router.get(Path, List);
    }

    if (Post) {
      router.post(Path, PostSchema || Schema, validator, Post);
    }

    if (Put) {
      router.put(Path, PutSchema || Schema, validator, Put);
    }

    if (Delete) {
      router.delete(Path, Delete);
    }
  });

  app.use(router);
};

export default setupController;
