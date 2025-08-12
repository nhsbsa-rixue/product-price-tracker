import * as schemas from "./schema";
import { StatusCodes } from 'http-status-codes';
import { CONSTANTS } from "../../constants";
import { v4 as uuid } from "uuid";


const Get: Controller = async (req, res) => {
  const product = req.products.find((item) => item.id === req.params.id);
  if (!product) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
  }

  return res.status(StatusCodes.OK).json(product);
};

const List: Controller = async (req, res) => {
  return res.status(StatusCodes.OK).json(req.products);
};

const Post: Controller = async (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: uuid(), name, price };
  req.products.push(newProduct);
  return res.status(StatusCodes.CREATED).json(newProduct);
};

const Put: Controller = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const productIndex = req.products.findIndex((item) => item.id === id);
  if (productIndex === -1) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
  }

  req.products[productIndex] = { ...req.products[productIndex], name, price };

  return res.status(StatusCodes.OK).json(req.products[productIndex]);
};

const Delete: Controller = async (req, res) => {
  const { id } = req.params;
  const productIndex = req.products.findIndex((item) => item.id === id);
  if (productIndex === -1) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
  }
  req.products.splice(productIndex, 1);
  return res.status(StatusCodes.NO_CONTENT).json({});
};

export const productController: RestControllers = {
  Path: CONSTANTS.PRODUCT_CONTROLLER_BASE_PATH,
  Get,
  Post,
  Put,
  List,
  Delete,
  ...schemas
};
