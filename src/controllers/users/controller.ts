import { StatusCodes } from 'http-status-codes';
import { CONSTANTS } from "../../constants";


export const List: Controller = async (req, res) => {
  return res.status(StatusCodes.OK).json(req.users);
};


export default {
  basePath: CONSTANTS.USER_CONTROLLER_BASE_PATH,
};
