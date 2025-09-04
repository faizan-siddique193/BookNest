import mongoose, { Schema } from "mongoose";

const wishListSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const WishList = mongoose.model("WishList", wishListSchema);
