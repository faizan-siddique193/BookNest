// src/components/admin/OrderManagement.jsx
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const OrderManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: '#ORD-1001',
      customer: 'John Doe',
      date: '2023-06-15',
      amount: 42.97,
      status: 'completed',
      items: [
        { id: '1', title: 'The Great Gatsby', price: 14.99, quantity: 1 },
        { id: '2', title: 'To Kill a Mockingbird', price: 12.99, quantity: 2 }
      ],
      shipping: {
        name: 'John Doe',
        address: '123 Main St, Apt 4B',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA'
      },
      payment: {
        method: 'credit_card',
        transactionId: 'ch_1J4jk2KZvE',
        status: 'succeeded'
      }
    },
    // More orders...
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-primary">Order Management</h2>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search orders by ID or customer..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent">
            <option>All Statuses</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-muted">
            No orders found matching your search criteria.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="font-medium text-primary">{order.id}</div>
                    <div className="text-sm text-muted">
                      {order.customer} • {order.date}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-bold text-primary">
                      ${order.amount.toFixed(2)}
                    </div>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => 
                        setExpandedOrder(expandedOrder === order.id ? null : order.id)
                      }
                      className="text-accent hover:text-primary"
                    >
                      {expandedOrder === order.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Order Items */}
                    <div className="md:col-span-1">
                      <h3 className="font-medium text-primary mb-3">Items</h3>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3"></div>
                            <div className="flex-1">
                              <div className="font-medium text-primary">
                                {item.title}
                              </div>
                              <div className="text-sm text-muted">
                                Qty: {item.quantity} • ${item.price.toFixed(2)}
                              </div>
                            </div>
                            <div className="font-medium text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="md:col-span-1">
                      <h3 className="font-medium text-primary mb-3">Shipping</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-medium">{order.shipping.name}</p>
                        <p className="text-muted">{order.shipping.address}</p>
                        <p className="text-muted">
                          {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
                        </p>
                        <p className="text-muted">{order.shipping.country}</p>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="md:col-span-1">
                      <h3 className="font-medium text-primary mb-3">Payment</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="capitalize">
                          <span className="text-muted">Method: </span>
                          {order.payment.method.replace('_', ' ')}
                        </p>
                        <p>
                          <span className="text-muted">Status: </span>
                          <span className={`capitalize ${
                            order.payment.status === 'succeeded'
                              ? 'text-success'
                              : 'text-danger'
                          }`}>
                            {order.payment.status}
                          </span>
                        </p>
                        <p className="text-muted">
                          Transaction: {order.payment.transactionId}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;