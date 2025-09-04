// src/components/admin/DashboardOverview.jsx
import React from 'react';
import { ArrowUp, BookOpen, ShoppingCart, User } from 'lucide-react';

const DashboardOverview = ({ stats }) => {
  const recentOrders = [
    { id: '#ORD-1001', customer: 'John Doe', date: '2023-06-15', amount: '$42.97', status: 'Completed' },
    { id: '#ORD-1002', customer: 'Jane Smith', date: '2023-06-14', amount: '$28.99', status: 'Shipped' },
    { id: '#ORD-1003', customer: 'Robert Johnson', date: '2023-06-14', amount: '$35.50', status: 'Processing' },
    { id: '#ORD-1004', customer: 'Emily Davis', date: '2023-06-13', amount: '$19.99', status: 'Completed' },
    { id: '#ORD-1005', customer: 'Michael Wilson', date: '2023-06-12', amount: '$52.75', status: 'Shipped' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
              </div>
              <div className="flex items-start">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-primary flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Recent Orders
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-medium">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'Shipped' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-accent hover:text-primary">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 text-right">
          <Link
            to="/admin/orders"
            className="text-sm text-accent hover:text-primary font-medium"
          >
            View all orders →
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Book Inventory Status
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted">Low Stock (≤ 5 items)</span>
                <span className="text-sm font-medium text-primary">12 books</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted">Out of Stock</span>
                <span className="text-sm font-medium text-primary">5 books</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Recent Customers
          </h3>
          <div className="space-y-4">
            {[
              { name: 'John Doe', email: 'john@example.com', joined: '2 days ago' },
              { name: 'Jane Smith', email: 'jane@example.com', joined: '3 days ago' },
              { name: 'Robert Johnson', email: 'robert@example.com', joined: '5 days ago' }
            ].map((customer, index) => (
              <div key={index} className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-primary">{customer.name}</p>
                  <p className="text-sm text-muted">{customer.email}</p>
                </div>
                <div className="ml-auto text-sm text-muted">
                  {customer.joined}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;