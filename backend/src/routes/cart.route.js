import { Router } from "express";
import {
  addToCart,
  getCartItem,
  deleteCartItem,
  updateCart,
} from "../controllers/cart.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirrebaseToken.middleware.js";

const cartRouter = Router();

cartRouter.route("/add-item").post(verifyFirebaseToken, addToCart);
cartRouter.route("/update-item").patch(verifyFirebaseToken, updateCart);
cartRouter.route("/get-item").get(verifyFirebaseToken, getCartItem);
cartRouter.route("/delete-item/:bookId").delete(verifyFirebaseToken, deleteCartItem);
export default cartRouter;
