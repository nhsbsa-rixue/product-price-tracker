import { StatusCodes } from 'http-status-codes';
import { CONSTANTS } from "../../constants";
import { sendAlert } from "../../cronJobs"
import { PostSchema } from "./schema"

const Post: Controller = async (req, res) => {
  const { alertType } = req.body;

  if (alertType == "day") {
    sendAlert("day");
  }
  else if (alertType == "night") {
    sendAlert("night");
  }
  else if (alertType == "fullDay") {
    sendAlert("day");
    sendAlert("night");
  }

  const successMessage = "Alerts sent successfully";
  return res.status(StatusCodes.OK).json({ message: successMessage });
};


export const mockAlertController: RestControllers = {
  Path: CONSTANTS.MOCK_ALERT_PATH,
  Post,
  PostSchema
};
