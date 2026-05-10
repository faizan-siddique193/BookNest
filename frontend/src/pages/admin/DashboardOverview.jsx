import React, { useEffect, useMemo, useState } from "react";
import { ArrowUp, BookOpen, ShoppingCart } from "lucide-react";
import { axiosInstance } from "../../api/axiosInstance";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const formatMonth = (entry) => {
  if (!entry?._id) return "";
  return `${entry._id.month}/${entry._id.year}`;
};

const DashboardOverview = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.role !== "admin") {
      setLoading(false);
      return;
    }

    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = await getIdToken(currentUser, { forceRefresh: true });
        const response = await axiosInstance.get("/admin/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAnalytics(response.data?.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to load admin analytics",
        );
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [user?.role]);

  const stats = useMemo(() => {
    if (!analytics) return [];
    return [
      {
        label: "Total Revenue",
        value: `$${analytics.totals.revenue.toFixed(2)}`,
        change: "This year",
      },
      {
        label: "Paid Orders",
        value: analytics.totals.orders,
        change: "All time",
      },
      {
        label: "Top Sellers",
        value: analytics.topSelling.length,
        change: "Books",
      },
      {
        label: "Low Stock",
        value: analytics.lowStockBooks.length,
        change: "Alerts",
      },
    ];
  }, [analytics]);

  return (
    <div className="space-y-6">
      {loading && !analytics ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-muted">Loading dashboard analytics...</p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="text-2xl font-bold text-primary mt-1">
                  {stat.value}
                </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Sales Revenue (Last 6 Months)
          </h3>
          <div className="space-y-3">
            {analytics?.revenueByMonth?.length ? (
              analytics.revenueByMonth.map((entry) => (
                <div
                  key={`${entry._id.year}-${entry._id.month}`}
                  className="flex justify-between"
                >
                  <span className="text-sm text-muted">
                    {formatMonth(entry)}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    ${entry.totalRevenue.toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted">No revenue data yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Top Selling Books
          </h3>
          <div className="space-y-4">
            {analytics?.topSelling?.length ? (
              analytics.topSelling.map((book) => (
                <div key={book.bookId} className="flex items-center gap-3">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-10 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-primary">
                      {book.title}
                    </p>
                    <p className="text-xs text-muted">Sold: {book.totalSold}</p>
                  </div>
                  <span className="ml-auto text-xs text-muted">
                    Stock: {book.stock}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted">No sales yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-primary mb-4">
          Low Stock Alerts
        </h3>
        {analytics?.lowStockBooks?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics.lowStockBooks.map((book) => (
              <div key={book._id} className="flex items-center gap-3">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-10 h-12 rounded object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-primary">
                    {book.title}
                  </p>
                  <p className="text-xs text-muted">Stock: {book.stock}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No low stock alerts.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
