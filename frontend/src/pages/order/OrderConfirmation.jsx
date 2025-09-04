import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  // Dummy order data
  const order = {
    orderNumber: "#ORD-9544",
    createdAt: new Date(),
    status: "Processing",
    totalAmount: 129.99,
    paymentMethod: "cash-on-delivery",
    shippingAddress: {
      fullName: "John Doe",
      phoneNumber: "+92 300 1234567",
      email: "john.doe@example.com",
      address: "123 Main Street",
      city: "Karachi",
      postalCode: "74000",
      country: "Pakistan",
    },
    items: [
      { bookTitle: "JavaScript Essentials", quantity: 1, priceAtPurchase: 59.99 },
      { bookTitle: "React Mastery Guide", quantity: 2, priceAtPurchase: 35 },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto text-center">
        <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />

        <h1 className="text-3xl font-bold text-primary mb-4">
          Order Confirmed!
        </h1>
        <p className="text-muted mb-6">
          Thank you for your purchase. Your order has been received and is being
          processed. We’ve also sent you a confirmation email.
        </p>

        {/* Order Summary */}
        <div className="bg-background rounded-lg p-6 mb-6 text-left">
          <h3 className="font-medium text-primary mb-3">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted">Order Number:</span>
              <span className="font-medium text-primary">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Date:</span>
              <span className="font-medium text-primary">
                {order.createdAt.toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Status:</span>
              <span className="font-medium text-success capitalize">
                {order.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Total:</span>
              <span className="font-bold text-success">
                ${order.totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Payment Method:</span>
              <span className="font-medium text-primary capitalize">
                {order.paymentMethod.replace("-", " ")}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-background rounded-lg p-6 mb-6 text-left">
          <h3 className="font-medium text-primary mb-3">Shipping Information</h3>
          <p className="text-muted">
            <span className="font-medium text-primary">
              {order.shippingAddress.fullName}
            </span>
            <br />
            {order.shippingAddress.address}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
            <br />
            Phone: {order.shippingAddress.phoneNumber}
          </p>
        </div>

        {/* Items */}
        <div className="bg-background rounded-lg p-6 mb-6 text-left">
          <h3 className="font-medium text-primary mb-3">Items in Your Order</h3>
          <ul className="divide-y divide-gray-200">
            {order.items.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between py-3 text-sm text-muted"
              >
                <span>
                  {item.bookTitle} × {item.quantity}
                </span>
                <span className="font-medium text-primary">
                  ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/home/books"
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
          >
            View Order Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
