import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const ensureAdmin = async (uid) => {
  const user = await User.findOne({ firebaseUserId: uid });
  if (!user || user.role !== "admin") {
    throw new ApiError(401, "Unauthorized user");
  }
  return user;
};

const getAdminNotifications = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  await ensureAdmin(uid);

  const limit = Math.min(parseInt(req.query.limit) || 6, 20);

  const [notifications, unreadCount] = await Promise.all([
    Notification.find({ recipientRole: "admin" })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean(),
    Notification.countDocuments({ recipientRole: "admin", isRead: false }),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        notifications,
        unreadCount,
      },
      "Admin notifications fetched successfully",
    ),
  );
});

const markAllAdminNotificationsRead = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  await ensureAdmin(uid);

  const result = await Notification.updateMany(
    { recipientRole: "admin", isRead: false },
    { $set: { isRead: true } },
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        modifiedCount: result.modifiedCount,
      },
      "Notifications marked as read",
    ),
  );
});

export { getAdminNotifications, markAllAdminNotificationsRead };
