import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirrebaseToken.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(verifyFirebaseToken, registerUser);
userRouter.route("/login").get(verifyFirebaseToken, loginUser);
userRouter.route("/profile").get(verifyFirebaseToken, getUserProfile);

export default userRouter;
