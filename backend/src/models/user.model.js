import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  firebaseUserId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
  },
}, {timestamps: true});


export const User = mongoose.model("User", userSchema);
