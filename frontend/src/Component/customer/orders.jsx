import React from "react";

const Orders = ({ orders }) => {
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
            className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between mb-2">
              <p className="font-medium text-primary">Order ID: {order._id}</p>
              <p
                className={`font-semibold ${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : order.status === "Pending"
                    ? "text-yellow-600"
                    : "text-gray-600"
                }`}
              >
                {order.status}
              </p>
            </div>

            <p className="text-sm text-muted mb-1">
              Date: {new Date(order.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-muted mb-1">
              Total: ${order.total.toFixed(2)}
            </p>
            <p className="text-sm text-muted">Payment: {order.paymentMethod}</p>

            {/* Optional: Display items in small list */}
            {order.items && order.items.length > 0 && (
              <div className="mt-2 text-sm text-primary">
                <p className="font-medium">Items:</p>
                <ul className="list-disc list-inside">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.name} x {item.quantity} - ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
  );
};

export default Orders;
