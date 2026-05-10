import { Order } from "../models/order.model.js";
import { Book } from "../models/book.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const getAdminAnalytics = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const user = await User.findOne({ firebaseUserId: uid });

  if (!user || user.role !== "admin") {
    throw new ApiError(401, "Unauthorized user");
  }

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const revenueByMonth = await Order.aggregate([
    {
      $match: {
        paymentStatus: "PAID",
        createdAt: { $gte: start },
      },
    },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        totalRevenue: { $sum: "$totalAmount" },
        totalOrders: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const topSelling = await Order.aggregate([
    { $match: { paymentStatus: "PAID" } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.bookId",
        totalSold: { $sum: "$items.quantity" },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "book",
      },
    },
    { $unwind: "$book" },
    {
      $project: {
        _id: 0,
        bookId: "$book._id",
        title: "$book.title",
        author: "$book.author",
        image: "$book.image",
        stock: "$book.stock",
        totalSold: 1,
      },
    },
  ]);

  const lowStockBooks = await Book.find({ stock: { $lte: 5 } })
    .sort({ stock: 1 })
    .limit(10)
    .select("title author image stock");

  const totalRevenue = await Order.aggregate([
    { $match: { paymentStatus: "PAID" } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  const totalOrders = await Order.countDocuments({ paymentStatus: "PAID" });

  return res.json(
    new ApiResponse(
      200,
      {
        revenueByMonth,
        topSelling,
        lowStockBooks,
        totals: {
          revenue: totalRevenue[0]?.total || 0,
          orders: totalOrders,
        },
      },
      "Admin analytics",
    ),
  );
});

export { getAdminAnalytics };
