// src/pages/ProfilePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileOverview from "../../Component/customer/ProfileOverview";
import ProfileForm from "../../Component/customer/ProfileForm";
import ProfileNav from "../../Component/customer/ProfileNav";
import { User, Bookmark, Package, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { Wishlist } from "../../Component/index";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState([]);
  const { loading, user } = useSelector((state) => state.user);

  const handleUpdateProfile = (updatedData) => {
    setUserData({ ...userData, ...updatedData });
    setEditMode(false);
    // In a real app, you would call an API here to update the user's data
  };

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Profile</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:w-1/4 border border-red-700">
            <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 border border-red-700">
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
                <p className="text-muted">You haven't placed any orders yet.</p>
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
