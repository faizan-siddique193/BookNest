// src/components/Cart/CartSummary.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CartSummary = ({ subtotal =0,shippingFee = 0, total = 0 }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
      <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-medium text-primary">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Shipping</span>
          <span className="font-medium text-primary">
            {shippingFee === 0 ? (
              <span className="text-success">Free</span>
            ) : (
              `$${shippingFee.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between">
          <span className="font-bold text-primary">Total</span>
          <span className="font-bold text-success">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-xs text-muted mb-6">
        * Shipping calculated at checkout
      </div>

      <Link
        to="/home/checkout"
        className="block w-full py-3 px-6 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors text-center flex items-center justify-center"
      >
        Proceed to Checkout
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>

      <div className="mt-4 text-center">
        <Link
          to="/home/books"
          className="text-sm text-accent hover:text-primary transition-colors inline-flex items-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
