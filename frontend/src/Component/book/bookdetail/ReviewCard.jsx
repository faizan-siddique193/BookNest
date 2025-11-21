import React, { useState } from "react";
import { Star, Trash2, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteReview,
  updateReview,
  getReviewsByBookId,
} from "../../../feature/review/reviewAction";
import Textarea from "../../Textarea";

const ReviewCard = ({ review }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(review?.rating);
  const [editedComment, setEditedComment] = useState(review?.comment);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { slug } = useParams();

 /*  const timeAgo = formatDistanceToNow(new Date(review.createdAt) , {
    addSuffix: true,
  }) : "Unknown date";
 */
  // Check if the current user is the review author
  // Compare with firebaseUserId since review.userId stores Firebase UID
  const isAuthor = user?.firebaseUserId === review?.userId;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await dispatch(
        deleteReview({ reviewId: review._id })
      ).unwrap();

      // DELETE THIS LOG
      console.log("Delete review action response:: ", response);
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error(error || "Failed to delete review");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async () => {
    if (!editedRating || !editedComment.trim()) {
      toast.error("Please provide both rating and comment");
      return;
    }

    setIsUpdating(true);
    try {
      await dispatch(
        updateReview({
          reviewId: review._id,
          rating: editedRating,
          comment: editedComment,
        })
      ).unwrap();
      toast.success("Review updated successfully");
      setIsEditing(false);
      // Refresh reviews list
      dispatch(getReviewsByBookId({ slug }));
    } catch (error) {
      toast.error(error || "Failed to update review");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditedRating(review?.rating);
    setEditedComment(review?.comment);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col border border-muted/20 rounded-xl p-4 mb-4 shadow-sm bg-secondary">
      {/* Header: Avatar + Name + Actions */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {review?.userInfo?.avatar ? (
            <img
              src={review.userInfo?.avatar}
              alt={review.userInfo?.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-xs font-bold text-primary">
              {review?.userInfo?.fullName
                ?.split(" ")
                .slice(0, 2)
                .map((word) => word.charAt(0).toUpperCase())
                .join("")}
            </div>
          )}
          <div>
            <h3 className="text-primary font-medium">
              {review?.userInfo?.fullName
                ?.split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ") || "Anonymous"}
            </h3>
            {/* <span className="text-xs text-muted">{timeAgo}</span> */}
          </div>
        </div>

        {/* Edit and Delete buttons */}
        {isAuthor && !isEditing && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 hover:bg-accent/10 rounded-lg transition-colors text-accent"
              title="Edit review"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 hover:bg-danger/10 rounded-lg transition-colors text-danger disabled:opacity-50"
              title="Delete review"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        // Edit Mode
        <div className="space-y-3">
          {/* Rating Editor */}
          <div>
            <label className="text-sm text-primary font-medium mb-2 block">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setEditedRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1"
                >
                  <Star
                    className={`h-5 w-5 ${
                      star <= (hoverRating || editedRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Editor */}
          <div>
            <label className="text-sm text-primary font-medium mb-2 block">
              Comment
            </label>
            <Textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              className="py-2 px-3 text-sm text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-lg"
              placeholder="Edit your review"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="flex-1 px-3 py-2 bg-primary text-secondary rounded-lg hover:bg-[#34495E] transition-colors disabled:opacity-60 text-sm font-medium"
            >
              {isUpdating ? "Updating..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-3 py-2 bg-muted text-secondary rounded-lg hover:bg-[#95A5A6] transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <>
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
          <p className="text-text">{review?.comment}</p>
        </>
      )}
    </div>
  );
};

export default ReviewCard;
