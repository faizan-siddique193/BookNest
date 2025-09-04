import { Input } from "../../index";
import { Controller, useForm } from "react-hook-form";
import { Star } from "lucide-react";
import { useState } from "react";

// Controlled StarRating component
const StarRating = ({ value, onChange }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="p-1"
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              star <= value
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const AddComment = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 5,
      name: "",
      comment: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    reset(); // Reset the form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* rating */}
      <div className="">
        <label className="block  text-muted mb-1">Your Rating</label>
        <Controller
          name="rating"
          control={control}
          rules={{ required: "Rating is required" }}
          render={({ field }) => (
            <StarRating value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.rating && (
          <span className="text-danger text-xs ml-2">
            {errors.rating.message}
          </span>
        )}
      </div>

      {/* name */}
      <div className="rounded-lg ">
        <Input
          className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-lg"
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
            maxLength: { value: 20, message: "Maximum 20 characters" },
          })}
        />
        {errors.name && (
          <span className="text-danger text-xs ml-2">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* comment */}
      <div className="rounded-lg bg-background">
        <textarea
          rows={5}
          className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-lg"
          placeholder="Your Review"
          {...register("comment", {
            required: "Review is required",
          })}
        ></textarea>
        {errors.comment && (
          <span className="text-danger text-xs ml-2">
            {errors.comment.message}
          </span>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90"
      >
        Submit Review
      </button>
    </form>
  );
};

export default AddComment;
