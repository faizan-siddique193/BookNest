// src/components/Cart/CartItemsList.jsx
import React from "react";
import CartItem from "./CartItem";
import { X } from "lucide-react";

const CartItemsList = ({ items, onQuantityChange, onRemoveItem }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header (Desktop) */}
      <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="col-span-5 font-medium text-primary">Product</div>
        <div className="col-span-2 font-medium text-primary text-center">
          Price
        </div>
        <div className="col-span-3 font-medium text-primary text-center">
          Quantity
        </div>
        <div className="col-span-2 font-medium text-primary text-right">
          Subtotal
        </div>
      </div>

      {/* Cart Items */}
      <div className="divide-y divide-gray-200 ">
        {items.map((item) => (
          <CartItem
            key={item?.bookId._id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItemsList;
