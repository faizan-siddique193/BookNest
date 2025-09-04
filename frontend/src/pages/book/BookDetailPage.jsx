import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  BookOpen,
  User,
  ChevronLeft,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";
import {
  ReviewsList,
  AddComment,
  AboutAuthor,
  BookDescription,
} from "../../Component/index";
import { useDispatch } from "react-redux";
import { getBookById } from "../../feature/book/bookAction";

const BookDetailPage = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState(null);
  const { slug } = useParams();
  const dispatch = useDispatch();

  // fetch book by id
  useEffect(() => {
    const fetchBookSlug = async () => {
      try {
        const response = await dispatch(getBookById({ slug })).unwrap();
        console.log("Book detail response:", response);

        setBook(response.data);
      } catch (error) {
        console.error("Internal server error:", error);
      }
    };
    fetchBookSlug();
  }, [slug, dispatch]);

  // fetch athor information
  

  const [review, setReview] = useState({
    rating: 5,
    comment: "",
    name: "",
  });
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "This book completely transformed my perspective on classic literature. The character development is exceptional!",
      date: "2023-08-15",
    },
    {
      id: 2,
      name: "Michael Torres",
      rating: 4,
      comment:
        "Beautiful prose and compelling narrative. The ending felt a bit rushed though.",
      date: "2023-07-22",
    },
  ]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = {
      id: reviews.length + 1,
      name: review.name || "Anonymous",
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([...reviews, newReview]);
    setReview({ rating: 5, comment: "", name: "" });
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                to="/home"
                className="text-muted hover:text-accent transition-colors text-sm"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted" />
              <Link
                to="/home/books"
                className="ml-2 text-muted hover:text-accent transition-colors text-sm"
              >
                Books
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted" />
              <span className="ml-2 text-sm font-medium text-primary truncate max-w-xs md:max-w-md">
                {book?.title}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Book Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Book Cover */}
          <div className="lg:w-2/5">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="group relative overflow-hidden rounded-lg aspect-[2/3] bg-gray-50">
                <img
                  src={book?.image}
                  alt={book?.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Book Info */}
          <div className="lg:w-3/5">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h1 className="text-3xl font-bold text-primary mb-2">
                {book?.title}
              </h1>
              <p className="text-lg text-muted mb-4">by {book?.author}</p>

              <div className="flex items-center mb-6">
                <div className="flex mr-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.floor(book?.averageRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-primary font-medium">
                  {book?.averageRating.toFixed(1)}
                </span>
                {/* TODO: <span className="mx-2 text-muted">•</span>
                <Link
                  to="#reviews"
                  className="text-accent hover:text-primary transition-colors"
                >
                  {reviews.length} reviews
                </Link> */}
              </div>

              <div className="flex items-center mb-6">
                <span className="text-lg font-bold text-primary mr-3">
                  ${book?.discountPrice?.toFixed(2) || book?.price.toFixed(2)}
                </span>
                {/* TODO: book discount */}
                {/* {book.discountPrice && (
                  <span className="text-muted line-through">
                    ${book?.price.toFixed(2)}
                  </span>
                )} */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted">Category</p>
                  <p className="text-primary font-medium">{book?.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Availability</p>
                  <p
                    className={`font-medium ${
                      book?.stock > 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {book?.stock > 0
                      ? `In Stock (${book?.stock} available)`
                      : "Out of Stock"}
                  </p>
                </div>
              </div>

              <p className="text-primary mb-8">{book?.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    className="p-2 text-primary hover:bg-gray-50"
                    onClick={() => handleQuantityChange("decrement")}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-3 py-1 text-primary font-medium">
                    {quantity}
                  </span>
                  <button
                    className="p-2 text-primary hover:bg-gray-50"
                    onClick={() => handleQuantityChange("increment")}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center ${
                    book?.stock > 0
                      ? "bg-accent text-white hover:bg-accent/90"
                      : "bg-gray-200 text-muted cursor-not-allowed"
                  }`}
                  disabled={book?.stock <= 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>

                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Heart className="h-5 w-5 text-muted" />
                </button>
              </div>

              {/* TODO:  <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-muted">
                  ISBN: 978-3-16-148410-0 | Pages: 218 | Publisher: Scribner
                </p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap">
              <button
                className={`py-4 px-6 font-medium text-sm transition-colors ${
                  activeTab === "description"
                    ? "text-accent border-b-2 border-accent"
                    : "text-muted hover:text-primary"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm transition-colors ${
                  activeTab === "author"
                    ? "text-accent border-b-2 border-accent"
                    : "text-muted hover:text-primary"
                }`}
                onClick={() => setActiveTab("author")}
              >
                About the Author
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm transition-colors ${
                  activeTab === "reviews"
                    ? "text-accent border-b-2 border-accent"
                    : "text-muted hover:text-primary"
                }`}
                onClick={() => setActiveTab("reviews")}
                id="reviews"
              >
                Reviews ({reviews.length})
              </button>
            </nav>
          </div>

          {/* Tabs Content */}
          <div className="p-6">
            {activeTab === "description" && <BookDescription description="" />}

            {/* about author */}
            {activeTab === "author" && <AboutAuthor />}

            {activeTab === "reviews" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Reviews Summary */}
                  <div className="md:col-span-1 bg-primary/5 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-primary mb-4">
                      Customer Reviews
                    </h3>
                    <div className="flex items-center mb-4">
                      <div className="text-4xl font-bold text-primary mr-4">
                        {book?.averageRating.toFixed(1)}
                      </div>
                      <div>
                        {/* display rating */}
                        <div className="flex mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= Math.floor(book?.averageRating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted text-sm">
                          Based on {reviews.length} reviews
                        </p>
                      </div>
                    </div>

                    {/* display average rating */}
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].reverse().map((rating) => (
                        <div key={rating} className="flex items-center">
                          <span className="text-sm text-primary w-8">
                            {rating} star
                          </span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2 overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full"
                              style={{ width: `${(rating / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted">
                            {((rating / 5) * 100).toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* display customer Reviews List  */}
                  <div className="md:col-span-2">
                    <ReviewsList />
                    {/* Add Review Form */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-xl font-bold text-primary mb-4">
                        Leave a Review
                      </h3>
                      <AddComment />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/*TODO: Related Books */}
        {/* <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">Related Books</h2>
            <Link
              to="/books"
              className="flex items-center text-accent font-medium hover:text-primary transition-colors"
            >
              View all <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {book.relatedBooks.map((related) => (
              <div key={related.id} className="group">
                <Link to={`/books/${related.id}`} className="block mb-3">
                  <div className="bg-gray-100 aspect-[2/3] rounded-lg overflow-hidden">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                  </div>
                </Link>
                <div className="px-1">
                  <Link
                    to={`/books/${related.id}`}
                    className="font-medium text-primary group-hover:text-accent transition-colors line-clamp-2"
                  >
                    {related.title}
                  </Link>
                  <p className="text-sm text-muted">{related.author}</p>
                  <p className="font-medium text-primary">
                    ${related.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* TODO: Mobile Sticky Add to Cart */}
      {/* <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="p-2 border border-gray-300 rounded-lg"
              onClick={() => handleQuantityChange('decrement')}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-3 py-1 text-primary font-medium">{quantity}</span>
            <button 
              className="p-2 border border-gray-300 rounded-lg"
              onClick={() => handleQuantityChange('increment')}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-3 border border-gray-300 rounded-lg">
              <Heart className="h-5 w-5 text-muted" />
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                book.stock > 0 
                  ? 'bg-accent text-white' 
                  : 'bg-gray-200 text-muted'
              }`}
              disabled={book.stock <= 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BookDetailPage;
