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
const BookInfo = ({ book, quantity }) => {
  return (
    <div className="lg:w-3/5">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-primary mb-2">{book.title}</h1>
        <p className="text-lg text-muted mb-4">by {book.author}</p>

        <div className="flex items-center mb-6">
          <div className="flex mr-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.floor(book.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-primary font-medium">
            {book.rating.toFixed(1)}
          </span>
          <span className="mx-2 text-muted">•</span>
          <Link
            to="#reviews"
            className="text-accent hover:text-primary transition-colors"
          >
            {reviews.length} reviews
          </Link>
        </div>

        <div className="flex items-center mb-6">
          <span className="text-lg font-bold text-primary mr-3">
            ${book.discountPrice?.toFixed(2) || book.price.toFixed(2)}
          </span>
          {book.discountPrice && (
            <span className="text-muted line-through">
              ${book.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-muted">Category</p>
            <p className="text-primary font-medium">{book.category}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Availability</p>
            <p
              className={`font-medium ${
                book.stock > 0 ? "text-success" : "text-danger"
              }`}
            >
              {book.stock > 0
                ? `In Stock (${book.stock} available)`
                : "Out of Stock"}
            </p>
          </div>
        </div>

        <p className="text-primary mb-8">{book.description}</p>

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
              book.stock > 0
                ? "bg-accent text-white hover:bg-accent/90"
                : "bg-gray-200 text-muted cursor-not-allowed"
            }`}
            disabled={book.stock <= 0}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </button>

          <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Heart className="h-5 w-5 text-muted" />
          </button>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-muted">
            ISBN: 978-3-16-148410-0 | Pages: 218 | Publisher: Scribner
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
