import { Schema } from "./schema";
import { StatusCodes } from 'http-status-codes';
import { CONSTANTS } from "../../constants";

const Get: Controller = async (req, res) => {
  // TODO add logic to get item by id
  return res.status(StatusCodes.OK).json({});
};

const List: Controller = async (req, res) => {
  // TODO add logic to list items in the table
  return res.status(StatusCodes.OK).json({});
};

const Post: Controller = async (req, res) => {
  // TODO add logic to create an item
  return res.status(StatusCodes.CREATED).json({});
};

const Put: Controller = async (req, res) => {
  // TODO add logic to update an item
  return res.status(StatusCodes.OK).json({});
};

const Delete: Controller = async (req, res) => {
  // TODO add logic to delete an item
  return res.status(StatusCodes.OK).json({});
};

const Watch: Controller = async (req, res) => {
  // TODO add logic to watch an item
  return res.status(StatusCodes.OK).json({});
};

export const productController: RestControllers = {
  Path: CONSTANTS.PRODUCT_CONTROLLER_BASE_PATH,
  Schema,
  Get,
  Post,
  Put,
  List,
  Delete
};
