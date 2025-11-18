import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileOverview from "../../Component/customer/ProfileOverview";
import ProfileForm from "../../Component/customer/ProfileForm";
import ProfileNav from "../../Component/customer/ProfileNav";
import { User, Bookmark, Package, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Wishlist } from "../../Component/index";
import Orders from "../../Component/customer/orders";
import { getMyOrders } from "../../feature/order/orderAction";
import { toast } from "react-toastify";


const userOrders = [
  {
    _id: "12345",
    date: "2025-11-18T12:00:00Z",
    status: "Delivered",
    total: 59.99,
    paymentMethod: "Credit Card",
    items: [
      { id: "a1", name: "Book A", quantity: 2, price: 20 },
      { id: "b1", name: "Book B", quantity: 1, price: 19.99 },
    ],
  },
  {
    _id: "12346",
    date: "2025-11-15T10:30:00Z",
    status: "Pending",
    total: 34.5,
    paymentMethod: "PayPal",
    items: [{ id: "c1", name: "Book C", quantity: 1, price: 34.5 }],
  },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  // TODO: Delete this log

  console.log("Order in profile page:: ", orders);

  const handleUpdateProfile = (updatedData) => {
    setUserData({ ...userData, ...updatedData });
    setEditMode(false);
    // In a real app, you would call an API here to update the user's data
  };

  
/*   useEffect(() => {
    const fetchOrders = async () => {
      try {
        await dispatch(getMyOrders({ currentPage })).unwrap();
      } catch (error) {
        toast.error(error || "Something went wrong while getting orders");
      }
    };

    fetchOrders();
  }, [dispatch, currentPage]); */

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Profile</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:w-1/4">
            <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {!editMode ? (
                  <ProfileOverview
                    userData={userData}
                    onEditClick={() => setEditMode(true)}
                  />
                ) : (
                  <ProfileForm
                    userData={userData}
                    onCancel={() => setEditMode(false)}
                    onSubmit={handleUpdateProfile}
                  />
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-primary mb-6 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  My Orders
                </h2>
                <Orders orders={userOrders} />
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-primary mb-6 flex items-center">
                  <Bookmark className="h-5 w-5 mr-2" />
                  My Wishlist
                </h2>

                {/* wishlist component */}
                <Wishlist />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
