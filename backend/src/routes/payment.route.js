import express, { Router } from "express";
import { verifyFirebaseToken } from "../middlewares/verifyFirrebaseToken.middleware.js";
import {
  createStripePayment,
  webhookEndpoints,
} from "../controllers/payment.controller.js";

const paymentRouter = Router();
paymentRouter
  .route("/create-checkout-session")
  .post(verifyFirebaseToken, createStripePayment);

  
paymentRouter
  .route("/stripe/webhook")
  .post(express.raw({ type: "application/json" }), webhookEndpoints);
export default paymentRouter;
