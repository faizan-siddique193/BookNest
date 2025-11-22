import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileOverview from "../../Component/customer/ProfileOverview";
import ProfileForm from "../../Component/customer/ProfileForm";
import ProfileNav from "../../Component/customer/ProfileNav";
import { User, Bookmark, Package, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Wishlist } from "../../Component/index";
import Orders from "../../Component/customer/orders";
import { getMyOrders } from "../../feature/order/orderAction";
import { getUserProfile } from "../../feature/user/userAction";
import { getAuth, getIdToken } from "firebase/auth";
import { toast } from "react-toastify";


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState(null);
  const { loading, user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect admin to admin dashboard
  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin/profile", { replace: true });
    }
  }, [user?.role, navigate]);

  // Get Firebase token and fetch profile (only once on mount)
  useEffect(() => {
    const fetchProfileData = async () => {
      const auth = getAuth();
      if (auth.currentUser) {
        try {
          const idToken = await getIdToken(auth.currentUser, {
            forceRefresh: true,
          });
          setToken(idToken);
          // Fetch user profile
          if (!user) {
            await dispatch(getUserProfile({ token: idToken })).unwrap();
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          toast.error("Failed to load profile");
        }
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfile = (updatedData) => {
    setEditMode(false);
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
            {loading && activeTab === "profile" ? (
              // Profile Loading Skeleton
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 space-y-8">
                  {/* Header Skeleton */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>

                  {/* Profile Content Skeleton */}
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                    {/* Avatar Skeleton */}
                    <div className="flex-shrink-0">
                      <div className="w-28 h-28 rounded-lg bg-gray-200 animate-pulse"></div>
                    </div>

                    {/* Profile Details Skeleton */}
                    <div className="flex-grow space-y-6 w-full">
                      {/* Full Name */}
                      <div>
                        <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
                        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                      </div>

                      {/* Email */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="h-6 w-64 bg-gray-200 rounded animate-pulse"></div>
                      </div>

                      {/* Role */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {activeTab === "profile" && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {!editMode ? (
                      <ProfileOverview
                        userData={user}
                        onEditClick={() => setEditMode(true)}
                      />
                    ) : (
                      <ProfileForm
                        userData={user}
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
                    <Orders orders={""} />
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
