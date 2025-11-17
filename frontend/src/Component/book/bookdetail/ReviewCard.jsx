import React from "react";
import { Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ReviewCard = ({ review }) => {
  const timeAgo = formatDistanceToNow(new Date(review.createdAt), {
    addSuffix: true,
  });
  return (
    <div className="flex flex-col border border-gray-200 rounded-xl p-4 mb-4 shadow-sm bg-white">
      {/* Header: Avatar + Name */}
      <div className="flex items-center gap-3 mb-2">
        {review?.userInfo?.avatar ? (
          <img
            src={review.user?.avatar}
            alt={review.user?.name}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 text-center align-middle"></div>
        )}
        <h3 className="text-primary font-medium">
          {review?.userInfo?.fullName.charAt(0).toUpperCase() +
            review?.userInfo?.fullName.slice(1)}
        </h3>
        <span className="text-xs text-gray-500 ml-2 !text-right">{timeAgo}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= review?.rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Message */}
      <p className="text-gray-700">{review?.comment}</p>
    </div>
  );
};

export default ReviewCard;
