import { Book } from "../models/book.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
const createBook = asyncHandler(async (req, res) => {
  const {
    title,
    author,
    description,
    price,
    category,
    image,
    pageCount,
    averageRating,
    stock,
    publishYear,
  } = req.body;
  if (
    [
      title,
      author,
      description,
      price,
      category,
      image,
      pageCount,
      averageRating,
      stock,
      publishYear,
    ].some((field) =>
      typeof field === "string"
        ? field.trim() === ""
        : field === undefined || field === null
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const { uid } = req.user;

  const user = await User.findOne({ firebaseUserId: uid });

  if (!user) {
    throw new ApiError(404, "User was not found");
  }

  if (user.role !== "admin") {
    throw new ApiError(401, "Unauthorized user");
  }

  const bookImgUrl = await uploadOnCloudinary(image);

  if (!bookImgUrl) {
    throw new ApiError(
      500,
      "Something went wrong while uploading a book image"
    );
  }
  const book = await Book.create({
    title,
    author,
    description,
    price,
    category,
    // subCategory,
    image: bookImgUrl.secure_url,
    pageCount,
    averageRating,
    stock,
    publishYear,
  });

  if (!book) {
    throw new ApiError(500, "Something went wrong while creating a book");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, book, "Book created successfully"));
});

// delete book
const deleteBook = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  //check authorization for creation of book
  const { uid } = req.user;

  //   find user and check it role
  const user = await User.findOne({ firebaseUserId: uid });

  if (!user) {
    throw new ApiError(404, "User was not found");
  }

  if (user.role !== "admin") {
    throw new ApiError(401, "UnAuthorized user");
  }

  const result = await Book.findOneAndDelete(slug);

  if (!result) {
    throw new ApiError(500, "Something went while deleting a book");
  }

  return res.json(new ApiResponse(200, "Book deleted successfully"));
});

// update book
const updateBook = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const updates = req.body.updates;

  //check authorization for creation of book
  const { uid } = req.user;

  //   find user and check it role
  const user = await User.findOne({ firebaseUserId: uid });

  if (!user) {
    throw new ApiError(404, "User was not found");
  }

  if (user.role !== "admin") {
    throw new ApiError(401, "UnAuthorized user");
  }

  const updatedBook = await Book.findOneAndUpdate({ slug }, updates, {
    returnDocument: "after", // ✅ replaces new: true
    runValidators: true,
  });

  console.log("Updating book with slug:", slug, "with updates:", updates);

  if (!updatedBook) {
    return res.status(500).json("Something went wrong while updating a book");
  }

  return res.json(new ApiResponse(200, "Book updated successfully"));
});

// find book by
const getBookBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  // find book by id
  const book = await Book.findOne({ slug });

  if (!book) {
    return res.status(500).json("Something went wrong while getting a book");
  }

  return res.json(new ApiResponse(200, book, "Book found successfully"));
});

// get all books by pagination
const getAllBooks = asyncHandler(async (req, res) => {
  const { p } = req.query;
  const page = parseInt(p) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const books = await Book.find({}).skip(skip).limit(limit);
  const totalBooks = await Book.countDocuments();
  if (!books || books.length === 0) {
    return res.status(404).json("No books found");
  }

  return res.json(
    new ApiResponse(
      200,
      {
        books,
        totalPages: Math.ceil(totalBooks / limit),
        currentPage: page,
        hasNext: page * limit < totalBooks,
        hasPrev: page > 1,
      },
      "Books found successfully"
    )
  );
});

// filtering and searching a book
const autocompleteSearch = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const results = await Book.aggregate([
    {
      $search: {
        index: "autoComplete",
        autocomplete: {
          query: query,
          path: "title",
        },
        highlight: {
          path: ["title"],
        },
      },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        name: 1,
        highlights: {
          $meta: "searchHighlights",
        },
      },
    },
  ]);

  if (!results || results.length === 0) {
    return res.status(404).json("No books found");
  }

  return res.json(new ApiResponse(200, results, "Book filtered successfully"));
});

// get books by category
const getBooksByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { p } = req.query;
  const page = parseInt(p) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const books = await Book.find({ category }).skip(skip).limit(limit);

  if (!books || books.length === 0) {
    return res.status(404).json("No books found in this category");
  }

  const totalBooks = await Book.countDocuments({ category });

  return res.json(
    new ApiResponse(
      200,
      {
        books,
        totalPages: Math.ceil(totalBooks / limit),
        currentPage: page,
        // hasNext: page * limit < totalBooks,
        // hasPrev: page > 1,
      },
      "Books found successfully"
    )
  );
});
export {
  createBook,
  updateBook,
  deleteBook,
  getBookBySlug,
  getAllBooks,
  autocompleteSearch,
  getBooksByCategory,
};
