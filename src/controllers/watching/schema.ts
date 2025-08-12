import { body } from "express-validator";

const Schema = [
    body("productId")
        .trim()
        .notEmpty()
        .withMessage("productId is required."),
    body("userEmail")
        .trim()
        .isEmail()
        .withMessage("Valid userEmail is required."),
    body("desiredPrice")
        .trim()
        .notEmpty()
        .withMessage("desiredPrice is required."),
    body("alertBy24Hours")
        .optional()
        .trim()
        .isBoolean()
        .withMessage("alertBy24Hours must be a boolean."),
    body("alertMorning")
        .optional()
        .trim()
        .isBoolean()
        .withMessage("alertMorning must be a boolean."),
    body("alertByNight")
        .optional()
        .trim()
        .isBoolean()
        .withMessage("alertByNight must be a boolean."),

];

export { Schema };
