import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { updateBook } from "../../feature/book/bookAction";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { Input, Textarea } from "../../Component/index";
import { LoaderCircle } from "lucide-react";
import { categoriesOption } from "../../constant/db";

const EditBook = () => {
  const [token, setToken] = useState("");
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = state?.book || null;
  const { slug } = useParams();

  const {
    control,
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      description: "",
      price: "",
      category: "",
      averageRating: "",
      pageCount: "",
      image: "",
      stock: "",
      publishYear: "",
    },
  });

  // Set the default values
  useEffect(() => {
    if (book) {
      reset({
        title: book?.title || "",
        author: book?.author || "",
        description: book?.description || "",
        price: book?.price || "",
        category: book?.category || "",
        averageRating: book?.averageRating || "",
        pageCount: book?.pageCount || "",
        image: book?.image || "",
        stock: book?.stock || "",
        publishYear: book?.publishYear || "",
      });
    }
  }, [book, reset]);

  // Get current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const currentUserToken = await getIdToken(user, { forceRefresh: true });
        setToken(currentUserToken);
      }
    });
    return unsubscribe;
  }, []);

  // Book update handler
  const onSubmit = async (updates) => {
    try {
      // Sanitize category to ensure it matches enum
      const sanitizedUpdates = {
        ...updates,
        category: updates.category?.trim().toLowerCase(),
      };

      await dispatch(updateBook({ token, slug, updates: sanitizedUpdates })).unwrap();

      // Navigate to the book page
      navigate("/admin/books");
      toast.success("Book updated successfully");
      reset();
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error?.message || "Internal server error");
    }
  };

  // Input field UI
  const inputStyle =
    "py-3 px-4 text-[#7F8C8D] focus:outline-none focus:ring-2 focus:ring-[#E67E22] w-full bg-[#F9F9F9] rounded-lg border border-[#7F8C8D]/30 transition-all duration-200 hover:border-[#7F8C8D]/50";

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Main content && edit form */}
      <div className="max-w-2xl w-full mx-auto border md:px-10 sm:px-6 px-5 py-5 rounded-lg bg-white shadow-sm">
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-primary font-bold text-center">
            Edit Book
          </h1>
          <p className="text-center text-muted">
            Update the book details below and save your changes.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div className="w-full">
            <Input
              className={inputStyle}
              placeholder="Book Title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-red-600 text-xs">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Author */}
          <div className="w-full">
            <Input
              className={inputStyle}
              placeholder="Author"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && (
              <span className="text-red-600 text-xs">
                {errors.author.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="w-full">
            <Textarea
              className={`${inputStyle} min-h-[120px]`}
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-red-600 text-xs">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="w-full">
              <Input
                className={inputStyle}
                type="number"
                step="0.01"
                placeholder="Price"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && (
                <span className="text-red-600 text-xs">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Category with Controller for proper default value */}
            <div className="w-full">
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`${inputStyle} w-full`}
                  >
                    <option value="">Select a category</option>
                    {categoriesOption.map((category) => (
                      <option
                        key={category.id}
                        value={category.value}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.category && (
                <span className="text-red-600 text-xs">
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>

          {/* Stock & Publish Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="w-full">
              <Input
                className={inputStyle}
                type="number"
                placeholder="Stock"
                {...register("stock", { required: "Stock is required" })}
              />
              {errors.stock && (
                <span className="text-red-600 text-xs">
                  {errors.stock.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <Input
                className={inputStyle}
                type="number"
                placeholder="Publish Year"
                {...register("publishYear", {
                  required: "Publish year is required",
                  min: { value: 1500, message: "Year must be after 1500" },
                  max: { value: new Date().getFullYear(), message: "Invalid year" },
                })}
              />
              {errors.publishYear && (
                <span className="text-red-600 text-xs">
                  {errors.publishYear.message}
                </span>
              )}
            </div>
          </div>

          {/* Average Rating & Page Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="w-full">
              <Input
                className={inputStyle}
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Average rating (0-5)"
                {...register("averageRating", {
                  min: { value: 0, message: "Rating must be at least 0" },
                  max: { value: 5, message: "Rating cannot exceed 5" },
                })}
              />
              {errors.averageRating && (
                <span className="text-red-600 text-xs">
                  {errors.averageRating.message}
                </span>
              )}
            </div>

            <div className="w-full">
              <Input
                className={inputStyle}
                type="number"
                placeholder="Page Count"
                {...register("pageCount", {
                  min: { value: 1, message: "Must be at least 1 page" },
                })}
              />
              {errors.pageCount && (
                <span className="text-red-600 text-xs">
                  {errors.pageCount.message}
                </span>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div className="w-full">
            <Input
              className={inputStyle}
              placeholder="Image URL"
              {...register("image", { required: "Image URL is required" })}
            />
            {errors.image && (
              <span className="text-red-600 text-xs">
                {errors.image.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#2C3E50] text-white rounded-lg hover:bg-[#34495E] transition-colors duration-300 font-medium mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin" size={20} />
                Updating...
              </>
            ) : (
              "Update Book"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;