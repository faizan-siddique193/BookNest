import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { fullName } = req.body;

  // Destructure user information from Firebase
  const { uid, email, name: firbaseName } = req.user;
  const user = await User.findOne({ firebaseUserId: uid });
  if (user) {
    return res.status(200).json(new ApiResponse("User already exists", user));
  }
  const name = fullName || firbaseName;
  const newUser = await User.create({
    firebaseUserId: uid,
    fullName: name,
    email,
  });
  if (!newUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }
  return res.json(
    new ApiResponse(201, "User registered successfully", newUser)
  );
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { uid, email } = req.user;

  const user = await User.findOne({ firebaseUserId: uid } || email);

  if (!user) {
    throw new ApiError(404, "User was not found in the database");
  }

  return res.json(
    new ApiResponse(200, { message: "User fetched successfully", user })
  );
});

// get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  // extract uid from middleware
  const { uid } = req.user;

  if (!uid) {
    throw new ApiError(403, "UnAuthorized user");
  }
  const user = await User.findOne({ firebaseUserId: uid });
  if (!user) {
    throw new ApiError(500, "Something went wrong while finding a user");
  }
  return res.json(new ApiResponse(200, user, "User found successfully"));
});

// upload avatar or chnage avatar

const updateProfileAvatar = asyncHandler(async (req, res) => {
  const userId = req.user.user_id;
  const avatar = req.files || req.files?.avatar?.[0];

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatarUrl = await uploadOnCloudinary(avatar);

  if (!avatarUrl) {
    throw new ApiError(500, "Something went wrong while uploading avatar");
  }

  const user = await User.findOneAndUpdate(
    { firebaseUserId: userId },
    { avatar: avatarUrl.url },
    { new: true }
  );

  if (!user) {
    throw new ApiError(500, "Something went wrong while updating avatar");
  }

  return res.json(new ApiResponse(200, "Avatar updated successfully"));
});

export { registerUser, loginUser, getUserProfile, updateProfileAvatar };
