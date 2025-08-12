import { StatusCodes } from 'http-status-codes';
import { CONSTANTS } from "../../constants";


const Post: Controller = async (req, res) => {
    const { productId, userEmail, desiredPrice, fullDayAlert, morningAlert, nightAlert } = req.body;

    const product = req.products.find((p) => p.id === productId);

    if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    }

    const user = req.users.find((u) => u.email === userEmail);

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    // Create a new watch entry
    const newWatchItem = {
        productId,
        userEmail,
        desiredPrice,
        fullDayAlert,
        morningAlert,
        nightAlert
    };

    req.watching.push(newWatchItem);

    return res.status(StatusCodes.OK).json(newWatchItem);
};


export const watchingController: RestControllers = {
    Path: CONSTANTS.WATCH_CONTROLLER_BASE_PATH,
    Post,
};
