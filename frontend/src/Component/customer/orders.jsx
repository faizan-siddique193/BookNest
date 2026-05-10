import React from "react";

const getStatusBadge = (status) => {
  if (status === "CONFIRMED") return "text-success bg-success/10";
  if (status === "CANCELLED") return "text-danger bg-danger/10";
  return "text-yellow-600 bg-yellow-100";
};

const Orders = ({ orders, onReorder }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-muted">
          You have not placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="p-5 border border-gray-200 rounded-xl bg-white hover:shadow-sm transition-shadow"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-primary text-base">
                Order #{order._id}
              </p>
              <p className="text-sm text-muted">
                {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                {order.items?.length || 0} items
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                  order.orderStatus,
                )}`}
              >
                {order.orderStatus}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary">
                {order.paymentStatus}
              </span>
              <span className="text-base font-semibold text-primary">
                ${order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-4 grid gap-2 text-base text-muted">
            <div className="flex flex-wrap gap-2">
              <span className="font-semibold text-primary">Payment:</span>
              <span className="capitalize">
                {order.paymentMethod.replace("-", " ")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="font-semibold text-primary">Ship To:</span>
              <span>
                {order.shippingAddress?.fullName}, {order.shippingAddress?.city}
              </span>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4">
            <h4 className="text-base font-semibold text-primary mb-3">Items</h4>
            <div className="space-y-2">
              {order.items?.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm text-muted"
                >
                  <span className="text-primary">
                    {item.bookId?.title || "Book"} × {item.quantity}
                  </span>
                  <span>
                    ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-muted">
              <span
                className={
                  order.orderStatus !== "CANCELLED"
                    ? "text-primary"
                    : "line-through"
                }
              >
                PENDING
              </span>
              <span>→</span>
              <span
                className={
                  order.orderStatus === "CONFIRMED"
                    ? "text-primary"
                    : "text-muted"
                }
              >
                CONFIRMED
              </span>
              <span>→</span>
              <span
                className={
                  order.orderStatus === "CANCELLED"
                    ? "text-danger"
                    : "text-muted"
                }
              >
                CANCELLED
              </span>
            </div>
            <button
              type="button"
              onClick={() => onReorder?.(order)}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-primary text-primary hover:bg-primary/10"
            >
              Reorder
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
