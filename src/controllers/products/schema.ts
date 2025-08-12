import { body } from "express-validator";

const Schema = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required."),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("price is required.")
    .isNumeric()
    .withMessage("price must be a number.")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("price must be positive.");
      }
      return true;
    }),
];

export { Schema };
