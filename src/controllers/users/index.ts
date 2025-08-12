import { StatusCodes } from 'http-status-codes';
import { CONSTANTS } from "../../constants";


const List: Controller = async (req, res) => {
  return res.status(StatusCodes.OK).json(req.users);
};


export const userController: RestControllers = {
  Path: CONSTANTS.USER_CONTROLLER_BASE_PATH,
  List,
};
