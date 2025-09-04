import mongoose from "mongoose";
import { Book } from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
const cartItemSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [cartItemSchema],

    // TODO: OPTIONAL
    /*  coupon: {
      type: String,
      default: null,
    }, */
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    totalQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

cartSchema.pre("validate", async function (next) {
  try {
    let total = 0;
    let totalQuantity = 0;

    for (const item of this.items) {
      // Populate the book price from the Book model
      const book = await Book.findById(item.bookId);
      if (!book) {
        throw new ApiError(404, "Book was not found");
      }

      total += book.price * item.quantity;
      totalQuantity += item.quantity;
    }

    this.total = total;
    this.totalQuantity = totalQuantity; // Add totalQuantity field in schema if not exists

    next();
  } catch (error) {
    next(error);
  }
});

export const Cart = mongoose.model("Cart", cartSchema);
