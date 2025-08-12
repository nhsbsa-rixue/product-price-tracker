import logger from "../logger";
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { CONSTANTS } from "../constants"; 

const errorHandler = (err, req, res, next) => {
  logger.error(err, err.message);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    body: err.message,
  });
  next();
};

const setupErrorHandlers = (app) => {
  app.use(errorHandler);

  app.all("*", (_, res) => {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
      status: StatusCodes.NOT_FOUND,
      body: CONSTANTS.NOT_FOUND_MESSAGE_BODY,
    });
  });
};

export default setupErrorHandlers;
