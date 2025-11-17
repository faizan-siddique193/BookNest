import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      index: true,
    },
    comment: {
      type: String,
      maxlength: 500,
      trim: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.virtual("userInfo", {
  ref: "User",
  localField: "userId", // in Review
  foreignField: "firebaseUserId", // in User
  justOne: true,
});

export const Review = mongoose.model("Review", reviewSchema);
