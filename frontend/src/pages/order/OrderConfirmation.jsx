import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../feature/order/orderAction";
import { toast } from "react-toastify";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "../../config/firebase";

const OrderConfirmation = () => {
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.loading);
  const selectedOrder = useSelector(
    (state) => state.order.orderInfo.selectedOrder
  );

  const { orderId } = useParams();

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

  useEffect(() => {
    if (!token) return; // wait until token is available

    const fetchOrderById = async () => {
      try {
        await dispatch(getOrderById({ orderId, token })).unwrap();
      } catch (error) {
        toast.error("Internal server error. Please wait");
      }
    };

    fetchOrderById();
  }, [orderId, token, dispatch]);

  if (loading || !selectedOrder) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto text-center animate-pulse">
          {/* Icon placeholder */}
          <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-6" />

          {/* Title */}
          <div className="h-8 w-2/3 bg-gray-200 rounded mx-auto mb-4" />

          {/* Subtitle */}
          <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto mb-6" />

          {/* Order Summary */}
          <div className="bg-background rounded-lg p-6 mb-6 text-left">
            <div className="h-5 w-1/3 bg-gray-200 rounded mb-4" />

            <div className="space-y-3">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-background rounded-lg p-6 mb-6 text-left">
            <div className="h-5 w-1/3 bg-gray-200 rounded mb-4" />
            <div className="space-y-2">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="h-4 w-2/3 bg-gray-200 rounded" />
              ))}
            </div>
          </div>

          {/* Items Section */}
          <div className="bg-background rounded-lg p-6 mb-6 text-left">
            <div className="h-5 w-1/3 bg-gray-200 rounded mb-4" />
            <ul className="space-y-3">
              {[...Array(3)].map((_, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="h-10 w-40 bg-gray-200 rounded-lg" />
            <div className="h-10 w-40 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

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
            {/* Order Number - optional */}
            {/* <div className="flex justify-between">
          <span className="text-muted">Order Number:</span>
          <span className="font-medium text-primary">{order.orderNumber}</span>
        </div> */}

            <div className="flex justify-between">
              <span className="text-muted">Date:</span>
              <span className="font-medium text-primary">
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted">Status:</span>
              <span className="font-medium text-success capitalize">
                {selectedOrder.status}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted">Total:</span>
              <span className="font-bold text-success">
                ${selectedOrder.totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted">Payment Method:</span>
              <span className="font-medium text-primary capitalize">
                {selectedOrder.paymentMethod.replace("-", " ")}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-background rounded-lg p-6 mb-6 text-left">
          <h3 className="font-medium text-primary mb-3">
            Shipping Information
          </h3>
          <p className="text-muted">
            <span className="font-medium text-primary">
              {selectedOrder.shippingAddress.fullName}
            </span>
            <br />
            {selectedOrder.shippingAddress.address}
            <br />
            {selectedOrder.shippingAddress.city},{" "}
            {selectedOrder.shippingAddress.postalCode}
            <br />
            {selectedOrder.shippingAddress.country}
            <br />
            Phone: {selectedOrder.shippingAddress.phoneNumber}
          </p>
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
