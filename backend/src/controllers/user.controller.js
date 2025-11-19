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

// update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { fullName } = req.body;

  if (!uid) {
    throw new ApiError(403, "UnAuthorized user");
  }

  // Check if user exists
  const user = await User.findOne({ firebaseUserId: uid });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Only allow fullName to be updated
  const updateData = {};
  if (fullName) {
    updateData.fullName = fullName;
  }

  const updatedUser = await User.findOneAndUpdate(
    { firebaseUserId: uid },
    updateData,
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw new ApiError(500, "Failed to update user profile");
  }

  return res.json(
    new ApiResponse(200, updatedUser, "Profile updated successfully")
  );
});

// upload avatar or change avatar
const updateProfileAvatar = asyncHandler(async (req, res) => {
  const { uid } = req.user;

  if (!uid) {
    throw new ApiError(403, "UnAuthorized user");
  }

  if (!req.file) {
    throw new ApiError(400, "Avatar file is required");
  }

  try {
    const filePath = req.file.path;
    console.log("Avatar file path:", filePath);

    // Upload to Cloudinary
    const avatarUrl = await uploadOnCloudinary(filePath);

    if (!avatarUrl || !avatarUrl.url) {
      throw new ApiError(500, "Failed to upload avatar to Cloudinary");
    }

    // Update user profile with avatar URL
    const user = await User.findOneAndUpdate(
      { firebaseUserId: uid },
      { avatar: avatarUrl.url },
      { new: true }
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Clean up temporary file
    const fs = await import("fs").then((m) => m.promises);
    try {
      await fs.unlink(filePath);
      console.log("Temp file deleted:", filePath);
    } catch (err) {
      console.log("Could not delete temp file:", err);
    }

    return res.json(new ApiResponse(200, user, "Avatar updated successfully"));
  } catch (error) {
    console.error("Avatar upload error:", error);
    throw new ApiError(500, error.message || "Failed to update avatar");
  }
});

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateProfileAvatar,
};
