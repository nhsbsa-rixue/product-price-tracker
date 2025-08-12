import { validationResult, FieldValidationError } from "express-validator";
import { StatusCodes, ReasonPhrases } from "http-status-codes"

const validator = (req, res, next) => {
  const errors = validationResult(req).array() as FieldValidationError[];

  if (errors && errors.length > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: ReasonPhrases.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      fieldErrors: errors.map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};

export { validator };
