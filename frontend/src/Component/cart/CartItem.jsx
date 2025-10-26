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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6 items-center">
  {/* Book Image & Info */}
  <div className="md:col-span-5 flex items-center gap-3 md:gap-4">
    <Link
      to={`home/books/${item?.bookId?.slug}`}
      className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden"
    >
      <img
        src={item?.bookId?.image}
        alt={item?.bookId?.title}
        className="w-full h-full object-cover"
      />
    </Link>
    <div className="min-w-0 flex-1">
      <Link
        to={`/home/books/${item?.bookId?.slug}`}
        className="font-medium text-primary hover:text-accent transition-colors line-clamp-2 block"
      >
        {item?.bookId?.title}
      </Link>
      <p className="text-sm text-muted truncate">{item?.bookId?.author}</p>
    </div>
  </div>

  {/* Price */}
  <div className="md:col-span-2 flex md:justify-center">
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted md:hidden">Price:</span>
      <span className="font-medium text-primary">
        ${item?.bookId?.price?.toFixed(2)}
      </span>
    </div>
  </div>

  {/* Quantity Selector */}
  <div className="md:col-span-3 flex md:justify-center">
    <div className="flex items-center gap-2 w-full md:w-auto">
      <span className="text-sm text-muted md:hidden">Qty:</span>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <button
          className="p-2 text-primary hover:bg-gray-50 disabled:opacity-50 transition-colors"
          onClick={() => handleQuantityChange("decrease")}
          disabled={item?.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="px-3 py-1 text-primary font-medium min-w-[2rem] text-center">
          {item?.quantity}
        </span>
        <button
          className="p-2 text-primary hover:bg-gray-50 transition-colors"
          onClick={() => handleQuantityChange("increase")}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>

  {/* Subtotal & Remove */}
  <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted md:hidden">Total:</span>
      <span className="font-medium text-primary">
        ${(item?.bookId?.price * item?.quantity).toFixed(2)}
      </span>
    </div>
    <button
      onClick={() => onRemoveItem(item?.bookId)}
      className="text-danger hover:text-danger/80 transition-colors p-1 rounded hover:bg-danger/10"
      aria-label="Remove item"
    >
      <Trash className="h-5 w-5" />
    </button>
  </div>
</div>
  );
};

export default CartItem;
