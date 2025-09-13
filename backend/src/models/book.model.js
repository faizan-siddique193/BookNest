import mongoose, { Schema } from "mongoose";
import slugify from "slugify";
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      enum: [
        "programming-languages",
        "web-development",
        "data-science-ai",
        "cybersecurity-networking",
        "cloud-devops",
        "computer-science-fundamentals",
      ],
    },
    image: {
      type: String,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.pre("validate", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // Ensure category matches enum exactly
  if (this.category) {
    this.category = this.category.toLowerCase(); // simple lowercase
    if (
      ![
        "programming-languages",
        "web-development",
        "data-science-ai",
        "cybersecurity-networking",
        "cloud-devops",
        "computer-science-fundamentals",
      ].includes(this.category)
    ) {
      return next(new Error("Invalid category"));
    }
  }

  if (this.category) {
    this.category = slugify(this.category, { lower: true, strict: true });
  }

  next();
});

export const Book = mongoose.model("Book", bookSchema);
