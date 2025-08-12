import { Schema } from "./schema";
import { StatusCodes } from 'http-status-codes';
import { CONSTANTS } from "../../constants";

const Get: Controller = async (req, res) => {
  // TODO add logic to get a skill by id
  return res.status(StatusCodes.OK).json({});
};

const List: Controller = async (req, res) => {
  // TODO add logic to list skills in the table
  return res.status(StatusCodes.OK).json({});
};

const Post: Controller = async (req, res) => {
  // TODO add logic to create a skill
  return res.status(StatusCodes.CREATED).json({});
};

const Put: Controller = async (req, res) => {
  // TODO add logic to update a skill
  return res.status(StatusCodes.OK).json({});
};

const Delete: Controller = async (req, res) => {
  // TODO add logic to delete a skill
  return res.status(StatusCodes.OK).json({});
};

export const skillController: RestControllers = {
  Path: CONSTANTS.USER_CONTROLLER_BASE_PATH,
  Schema,
  Get,
  Post,
  Put,
  List,
  Delete
};
