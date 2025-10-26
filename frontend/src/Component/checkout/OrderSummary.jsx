import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderSummary = () => {
  const { cart } = useSelector((state) => state.cart);
  return (
    <div className="lg:w-1/3">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
        <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>
        <div className="mb-6">
          <h3 className="font-medium text-primary mb-3">
            Order Items ({cart.totalQuantity})
          </h3>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item._id} className="flex items-center">
                <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                  <img
                    src={item.bookId.image}
                    alt={item.bookId.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-primary line-clamp-1">
                    {item.bookId.title}
                  </p>
                  <p className="text-sm text-muted">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-primary">
                  ${(item.bookId.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span className="font-medium text-primary">
              ${cart.total.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="font-bold text-primary">Total</span>
            <span className="font-bold text-success">
              ${cart.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
