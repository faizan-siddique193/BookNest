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

export default paymentRouter;
