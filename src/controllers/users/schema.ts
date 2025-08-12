import { body } from "express-validator";

const Schema = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required.")
];

export { Schema };
