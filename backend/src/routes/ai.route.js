import { Router } from "express";
import {
  getBookConcierge,
  getBookSummary,
} from "../controllers/ai.controller.js";

const aiRouter = Router();

aiRouter.route("/concierge").post(getBookConcierge);
aiRouter.route("/summary/:slug").get(getBookSummary);

export default aiRouter;
