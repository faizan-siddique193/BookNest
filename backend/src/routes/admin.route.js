import { Router } from "express";
import { verifyFirebaseToken } from "../middlewares/verifyFirrebaseToken.middleware.js";
import { getAdminAnalytics } from "../controllers/admin.controller.js";
import {
  getAdminNotifications,
  markAllAdminNotificationsRead,
} from "../controllers/notification.controller.js";

const adminRouter = Router();

adminRouter.route("/analytics").get(verifyFirebaseToken, getAdminAnalytics);
adminRouter
  .route("/notifications")
  .get(verifyFirebaseToken, getAdminNotifications);
adminRouter
  .route("/notifications/read-all")
  .patch(verifyFirebaseToken, markAllAdminNotificationsRead);

export default adminRouter;
