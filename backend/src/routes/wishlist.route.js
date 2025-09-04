import { Router } from "express";
import {
  addToWishList,
  getWhislistItem,
  deleteWishListItem,
} from "../controllers/wishlist.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirrebaseToken.middleware.js";
const whishListRouter = Router();
whishListRouter.route("/add-item").post(verifyFirebaseToken, addToWishList);
whishListRouter.route("/get-item").get(verifyFirebaseToken, getWhislistItem);
whishListRouter.route("/delete-item").patch(verifyFirebaseToken, deleteWishListItem);
export default whishListRouter;
