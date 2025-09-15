
import { StatusCodes } from 'http-status-codes';
import { v4 as uuid } from "uuid";
import { CONSTANTS } from "../../constants";

export const Get: Controller = async (req, res) => {
    const product = req.products.find((item) => item.id === req.params.id);
    if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    }

    return res.status(StatusCodes.OK).json(product);
};

export const List: Controller = async (req, res) => {
    return res.status(StatusCodes.OK).json(req.products);
};

export const Post: Controller = async function (req, res) {
    const { name, price } = req.body;
    const newProduct = { id: uuid(), name, price };
    req.products.push(newProduct);
    return res.status(StatusCodes.CREATED).json(newProduct);
};

export const Put: Controller = async function (req, res) {
    const { id } = req.params;
    const { name, price } = req.body;

    const productIndex = req.products.findIndex((item) => item.id === id);
    if (productIndex === -1) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    }

    req.products[productIndex] = { ...req.products[productIndex], name, price };

    return res.status(StatusCodes.OK).json(req.products[productIndex]);
};

export const Delete: Controller = async (req, res) => {
    const { id } = req.params;
    const productIndex = req.products.findIndex((item) => item.id === id);
    if (productIndex === -1) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    }
    req.products.splice(productIndex, 1);
    return res.status(StatusCodes.NO_CONTENT).json({});
};
export default { path: CONSTANTS.PRODUCT_CONTROLLER_BASE_PATH };