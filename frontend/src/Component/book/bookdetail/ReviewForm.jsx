import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import Input from "../../Input";
import Textarea from "../../Textarea";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createReview,
  getReviewsByBookId,
} from "../../../feature/review/reviewAction";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const dispatch = useDispatch();
  const { slug } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { rating: 0, comment: "" },
  });

  // Sync rating with react-hook-form
  useEffect(() => {
    setValue("rating", rating);
  }, [rating, setValue]);

  const onSubmitHandler = async (data) => {
    console.log("Review data:: ", data);

    try {
      await dispatch(
        createReview({
          slug,
          rating: data.rating,
          comment: data.comment,
        })
      ).unwrap();
      toast.success("Your review has been submitted successfully.");
      reset();
      setHover(0);
      setRating(0);
      // get review

      dispatch(getReviewsByBookId({ slug }));
    } catch (error) {
      console.log("Review error:: ", error);
      toast.error(error);
      setHover(0);
      setRating(0);
      reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {/* Rating */}
        <div className="mb-4">
          <label className="block text-primary mb-2">Your Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  className={`h-5 w-5 ${
                    star <= (hover || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <Input
            type="hidden"
            {...register("rating", {
              required: "Rating is required",
              min: {
                value: 1,
                message: "Please select a rating between 1 and 5.",
              },
            })}
          />
          {errors.rating && (
            <span className="text-danger text-xs ml-2">
              {errors.rating.message}
            </span>
          )}
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label className="block text-primary mb-2">Message</label>
          <Textarea
            className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-2xl"
            placeholder="Write your review"
            {...register("comment", { required: "Comment is required" })}
          />
          {errors.comment && (
            <span className="text-danger text-xs ml-2">
              {errors.comment.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-primary text-white rounded-2xl hover:bg-[#34495E] transition-colors duration-300"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
