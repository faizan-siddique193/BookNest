import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  const book = state?.book || null; // Get book data from state
  const { slug } = useParams();
  console.log("Book data in EditBook:", book);

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

  //   set the default values
  useEffect(() => {
    reset({
      title: book?.title,
      author: book.author,
      description: book?.description,
      price: book?.price,
      category: book?.category,
      averageRating: book?.averageRating,
      pageCount: book?.pageCount,
      image: book?.image,
      stock: book?.stock,
      publishYear: book?.publishYear,
    });
  }, [reset]);

  //   get current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const currentUserToken = await getIdToken(user, { forceRefresh: true });
        setToken(currentUserToken);
      }
    });
    return unsubscribe;
  }, []);

  //   book updatehandler
  const onSubmit = async (updates) => {
    try {
      await dispatch(updateBook({ token, slug, updates })).unwrap();

      //navigate to the book page
      navigate("/admin/books");
      toast.success("Book updated successfully");
      reset();
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  //   input field ui
  const inputStyle =
    "py-3 px-4 text-[#7F8C8D] focus:outline-none focus:ring-2 focus:ring-[#E67E22] w-full bg-[#F9F9F9] rounded-lg border border-[#7F8C8D]/30 transition-all duration-200 hover:border-[#7F8C8D]/50";

  return (
    <div className="w-full min-h-screen bg-background">
      {/* main content && edit form */}
      <div className="max-w-2xl w-full mx-auto border md:px-10 sm:px-6 px-5 py-5 rounded-lg bg-white shadow-sm">
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl md:text-3xl  text-primary font-bold text-center">
            Edit Book{" "}
          </h1>
          <p className="text-center text-muted">
            Update the book details below and save your changes.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
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
            <Input
              className={inputStyle}
              type="number"
              step="0.01"
              placeholder="Price"
              {...register("price", { required: "Price is required" })}
            />
            {/* category */}
            <select
              className={`${inputStyle} w-full`}
              {...register("category", { required: "Category is required" })}
            >
              {categoriesOption.map((category) => (
                <option
                  className="border-none outline-none"
                  key={category?.id}
                  value={category?.name}
                >
                  {category?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock & Publish Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              className={inputStyle}
              type="number"
              placeholder="Stock"
              {...register("stock", { required: "Stock is required" })}
            />
            <Input
              className={inputStyle}
              type="number"
              placeholder="Publish Year"
              {...register("publishYear", {
                required: "Publish year is required",
                min: { value: 1500, message: "Too old" },
              })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Average Rating */}
            <Input
              className={inputStyle}
              type="number"
              step="0.1"
              placeholder="Average rating"
              {...register("averageRating")}
            />
            {/* Page count */}
            <Input
              className={inputStyle}
              type="number"
              placeholder="PageCount"
              {...register("pageCount")}
            />
          </div>

          {/* Image URL */}
          <Input
            className={inputStyle}
            placeholder="Image URL"
            {...register("image", { required: "Image URL is required" })}
          />
          {errors.image && (
            <span className="text-red-600 text-xs">{errors.image.message}</span>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-[#2C3E50] text-white rounded-lg hover:bg-[#34495E] transition-colors duration-300 font-medium mt-4 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin" size={20} />
                Updating...
              </>
            ) : (
              "Edit Book"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
