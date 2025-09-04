import { Router } from "express";
import { verifyFirebaseToken } from "../middlewares/verifyFirrebaseToken.middleware.js";
import {
  getMyOrders,
  getOrderById,
  placeOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const orderRouter = Router();
orderRouter.route("/create").post(verifyFirebaseToken, placeOrder);
orderRouter
  .route("update/:orderId")
  .patch(verifyFirebaseToken, updateOrderStatus);
orderRouter.route("get/:orderId").get(verifyFirebaseToken, getOrderById);
orderRouter.route("/get/orders").get(verifyFirebaseToken, getMyOrders);
export default orderRouter;
