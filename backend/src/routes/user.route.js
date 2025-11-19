import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateProfileAvatar,
} from "../controllers/user.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirrebaseToken.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(verifyFirebaseToken, registerUser);
userRouter.route("/login").get(verifyFirebaseToken, loginUser);
userRouter.route("/profile").get(verifyFirebaseToken, getUserProfile);
userRouter.route("/profile").put(verifyFirebaseToken, updateUserProfile);
userRouter
  .route("/profile/avatar")
  .put(verifyFirebaseToken, upload.single("avatar"), updateProfileAvatar);

export default userRouter;
