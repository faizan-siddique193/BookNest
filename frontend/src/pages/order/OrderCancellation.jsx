import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getOrderById } from "../../feature/order/orderAction.js";

const OrderCancellation = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.order.loading);
  const selectedOrder = useSelector(
    (state) => state.order.orderInfo.selectedOrder
  );
  // try auth token from store or localStorage (adjust to your app)
  const token =
    useSelector((state) => state.auth?.token) || localStorage.getItem("token");

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById({ orderId, token }));
    }
  }, [orderId, token, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-semibold mb-3 text-red-600">
          Order Cancelled
        </h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading order details...</p>
        ) : selectedOrder ? (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Your order <strong>#{selectedOrder._id || orderId}</strong> has
              been cancelled.
            </p>

            <div className="mb-4 text-left border rounded p-4 bg-gray-50">
              <p className="text-sm text-gray-700">
                <strong>Status:</strong>{" "}
                <span className="capitalize">{selectedOrder.status}</span>
              </p>
              <p className="text-sm text-gray-700">
                <strong>Items:</strong> {selectedOrder.items?.length || 0}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Total:</strong> ${selectedOrder.totalAmount ?? "0.00"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Reason:</strong>{" "}
                {selectedOrder.cancellationReason || "Not provided"}
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate("/home/orders")}
                className="px-4 py-2 bg-[#2C3E50] text-white rounded-md"
              >
                View My Orders
              </button>
              <Link
                to="/home"
                className="px-4 py-2 border rounded-md text-[#2C3E50]"
              >
                Back to Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              We could not find details for order <strong>#{orderId}</strong>.
            </p>

            <p className="text-sm text-gray-600 mb-6">
              If you believe this is a mistake, please contact support:
              <br />
              <a
                className="text-accent underline"
                href="mailto:support@yourstore.com"
              >
                support@yourstore.com
              </a>
            </p>

            <div className="flex gap-3 justify-center">
              <Link
                to="/home/orders"
                className="px-4 py-2 bg-[#2C3E50] text-white rounded-md"
              >
                View My Orders
              </Link>
              <Link
                to="/home"
                className="px-4 py-2 border rounded-md text-[#2C3E50]"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCancellation;
