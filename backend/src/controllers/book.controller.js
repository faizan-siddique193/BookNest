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
    isFeatured,
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
      isFeatured,
    ].some((field) =>
      typeof field === "string"
        ? field.trim() === ""
        : field === undefined || field === null,
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

  const book = await Book.create({
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
    isFeatured,
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

  const result = await Book.findOneAndDelete({ slug });

  if (!result) {
    throw new ApiError(500, "Something went while deleting a book");
  }

  return res.json(new ApiResponse(200, null, "Book deleted successfully"));
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
    returnDocument: "after",
    runValidators: true,
  });

  if (!updatedBook) {
    return res.status(500).json("Something went wrong while updating a book");
  }

  return res.json(
    new ApiResponse(200, updatedBook, "Book updated successfully"),
  );
});

// find book by
const getBookBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  // find book by id
  const book = await Book.findOne({ slug });

  if (!book) {
    return res.status(404).json("Something went wrong while getting a book");
  }

  return res.json(new ApiResponse(200, book, "Book found successfully"));
});

// get all books by pagination
const getAllBooks = asyncHandler(async (req, res) => {
  const {
    p,
    q,
    categories,
    minPrice,
    maxPrice,
    sort,
    availability,
    minRating,
  } = req.query;
  const page = parseInt(p) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const filter = {};

  if (q) {
    const search = q.trim();
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  if (categories) {
    const categoryList = categories
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    if (categoryList.length > 0) {
      filter.category = { $in: categoryList };
    }
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice !== undefined) {
      filter.price.$gte = Number(minPrice);
    }
    if (maxPrice !== undefined) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  if (availability === "in-stock") {
    filter.stock = { $gt: 0 };
  }

  if (availability === "out-of-stock") {
    filter.stock = { $eq: 0 };
  }

  if (minRating !== undefined) {
    filter.averageRating = { $gte: Number(minRating) };
  }

  const sortMap = {
    newest: { createdAt: -1 },
    "price-low": { price: 1 },
    "price-high": { price: -1 },
    rating: { averageRating: -1 },
    popular: { averageRating: -1 },
  };

  const sortOption = sortMap[sort] || { createdAt: -1 };

  const books = await Book.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
  const totalBooks = await Book.countDocuments(filter);

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
      "Books found successfully",
    ),
  );
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
      "Books found successfully",
    ),
  );
});

// get featured books
const getFeaturedBooks = asyncHandler(async (req, res) => {
  const featuredBooks = await Book.find({ isFeatured: true });

  if (!featuredBooks) {
    res.json(new ApiResponse(404, "Featured books are not available"));
  }

  res.json(
    new ApiResponse(200, featuredBooks, "Featured books found successfully"),
  );
});

// get latest books
const getLatestBooks = asyncHandler(async (req, res) => {
  const days = parseInt(req.query.days) || 30;
  const now = new Date();
  const cutoffDate = new Date(now);
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const latestBooks = await Book.find({
    createdAt: { $gte: cutoffDate },
  }).sort({ createdAt: -1 });

  if (!latestBooks || latestBooks.length === 0) {
    return res.json(new ApiResponse(404, "", "Books not found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, latestBooks, "Latest books fetched successfully"),
    );
});

// get all books for admin

const getAllBooksForAdmin = asyncHandler(async (req, res) => {
  const { p } = req.query;
  const page = parseInt(p) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
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
      "Books found successfully",
    ),
  );
});

export {
  createBook,
  updateBook,
  deleteBook,
  getBookBySlug,
  getAllBooks,
  getBooksByCategory,
  getFeaturedBooks,
  getLatestBooks,
  getAllBooksForAdmin,
};
