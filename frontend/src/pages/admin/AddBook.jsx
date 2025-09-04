import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input, Textarea } from "../../Component/index";
import { LoaderCircle, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../feature/book/bookAction";
import { auth } from "../../config/firebase";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { clearBookState } from "../../feature/book/bookSlice";
import { categoriesOption } from "../../constant/db";
const AddBook = () => {
  const [token, setToken] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [book, setBook] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { loading, success, error } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  // Debounced fetch from Google Books API
  const fetchBook = useCallback(async () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          trimmedQuery
        )}`
      );

      const Books = await response.json();

      if (!Books.items || Books.items.length === 0) {
        setBook(null);
        setNotFound(true);
        return;
      }

      setNotFound(false);
      setBook(Books.items[0]?.volumeInfo || null);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  }, [searchQuery]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchBook();
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery, fetchBook]);

  // Get current user token
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const currentUserToken = await getIdToken(user, { forceRefresh: true });
        setToken(currentUserToken);
      }
    });
    return unsubscribe;
  }, []);

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
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

  // Autofill form when a book is found
  useEffect(() => {
    if (book) {
      setValue("title", book.title || "");
      setValue("author", book.authors?.join(", ") || "");
      setValue("description", book.description || "");
      setValue("publishYear", book.publishedDate?.split("-")[0] || "");
      setValue("averageRating", book.averageRating || "");
      setValue("pageCount", book.pageCount || "");
      setValue(
        "image",
        book.imageLinks?.thumbnail
          ? book.imageLinks.thumbnail.replace("http://", "https://")
          : ""
      );
    }
  }, [book, setValue]);

  // Submit handler
  const onSubmit = (data) => {
    console.log("data to submit:", data);

    const payload = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      pageCount: Number(data.pageCount),
      averageRating: data.averageRating ? Number(data.averageRating) : 0,
      publishYear: Number(data.publishYear),
    };
    dispatch(createBook({ token, ...payload }));
  };

  // Reset after success
  useEffect(() => {
    if (success) {
      reset();
      setBook(null);
      setSearchQuery("");
      toast.success("Book added successfully");
      // clear book state
      dispatch(clearBookState());
    }
  }, [success, reset]);

  const inputStyle =
    "py-3 px-4 text-[#7F8C8D] focus:outline-none focus:ring-2 focus:ring-[#E67E22] w-full bg-[#F9F9F9] rounded-lg border border-[#7F8C8D]/30 transition-all duration-200 hover:border-[#7F8C8D]/50";

  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col items-center space-y-7 px-4 py-8">
      {/* Search */}
      <div
        tabIndex={0}
        className="max-w-3xl w-full rounded-xl flex items-center gap-x-2 border bg-secondary px-3 focus-within:ring-2 focus-within:ring-accent"
      >
        <Search className="text-muted" size={15} />
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          className="w-full h-full py-3 rounded-xl outline-none text-muted"
          type="text"
          placeholder="Search by title, author, or ISBN"
        />
      </div>

      {notFound && (
        <p className="text-red-500 text-sm">No book found for your search.</p>
      )}

      {/* Form */}
      <div className="max-w-3xl w-full border border-[#7F8C8D]/20 rounded-2xl p-6 bg-white shadow-md">
        <h2 className="text-3xl font-bold text-center mb-2 text-[#2D2D2D]">
          Add a New Book
        </h2>
        <p className="text-center text-[#7F8C8D] mb-6">
          Fill the form to add book details
        </p>

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
            <Input
              className={inputStyle}
              type="number"
              step="0.01"
              placeholder="Price"
              {...register("price", { required: "Price is required" })}
            />
            {/* categories */}
            <select
              className={`${inputStyle} w-full`}
              {...register("category", { required: "Category is required" })}
            >
              {categoriesOption.map((category) => (
                <option
                  className="border-none outline-none"
                  key={category?.id}
                  value={category?.value}
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
            disabled={loading || !token}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={20} />
                Adding..
              </>
            ) : (
              "Add Book"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
