import React from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, X, Trash } from "lucide-react";

const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
  // In CartItem.jsx
  const handleQuantityChange = (type) => {
    const newQuantity =
      type === "increase" ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity > 0) {
      onQuantityChange(item.bookId._id, newQuantity);
    } else {
      // Remove item if quantity becomes 0
      onRemoveItem(item.bookId._id);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center">
      {/* Book Image & Info */}
      <div className="md:col-span-5 flex items-center">
        <Link
          to={`home/books/${item?.bookId?.slug}`}
          className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden mr-4"
        >
          <img
            src={item?.bookId?.image}
            alt={item?.bookId?.title}
            className="w-full h-full object-cover"
          />
        </Link>
        <div>
          <Link
            to={`/home/books/${item?.bookId?.slug}`}
            className="font-medium text-primary hover:text-accent transition-colors line-clamp-2"
          >
            {item?.bookId?.title}
          </Link>
          <p className="text-sm text-muted">{item?.bookId?.author}</p>
        </div>
      </div>

      {/* Price */}
      <div className="md:col-span-2 text-center">
        <span className="font-medium text-primary">
          ${item?.bookId?.price?.toFixed(2)}
        </span>
      </div>

      {/* Quantity Selector */}
      <div className="md:col-span-3 flex justify-center">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            className="p-2 text-primary hover:bg-gray-50 disabled:opacity-50"
            onClick={() => handleQuantityChange("decrease")}
            disabled={item?.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-3 py-1 text-primary font-medium">
            {item?.quantity}
          </span>
          <button
            className="p-2 text-primary hover:bg-gray-50"
            onClick={() => handleQuantityChange("increase")}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Subtotal & Remove */}
      <div className="md:col-span-2 flex items-center justify-end space-x-4">
        <span className="font-medium text-primary">
          ${(item?.bookId?.price * item?.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => onRemoveItem(item?.bookId)}
          className="text-danger hover:text-danger/80 transition-colors p-1"
          aria-label="Remove item"
        >
          <Trash className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
