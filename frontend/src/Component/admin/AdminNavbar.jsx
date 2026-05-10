import React, { useState, useRef, useEffect } from "react";
import { PanelLeft, Search, Bell, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../feature/auth/authAction";
import { axiosInstance } from "../../api/axiosInstance";
import { auth } from "../../config/firebase";
import { getIdToken } from "firebase/auth";
import { getSocket } from "../../utils/socket";

const AdminNavbar = ({ onToggleSidebar }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null); // <-- Add ref
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = getSocket();

  const handleToggleSidebar = () => {
    const newValue = !toggleSidebar;
    setToggleSidebar(newValue);
    onToggleSidebar(newValue);
  };

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/sign-in");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        void markNotificationsAsRead();
      }
      return nextState;
    });
  };

  const loadNotifications = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const token = await getIdToken(currentUser, { forceRefresh: true });
    const response = await axiosInstance.get("/admin/notifications?limit=6", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotifications(response.data?.data?.notifications || []);
    setUnreadCount(response.data?.data?.unreadCount || 0);
  };

  const markNotificationsAsRead = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser || unreadCount === 0) return;

    try {
      const token = await getIdToken(currentUser, { forceRefresh: true });
      await axiosInstance.patch(
        "/admin/notifications/read-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setNotifications((current) =>
        current.map((notification) => ({ ...notification, isRead: true })),
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    loadNotifications().catch((error) => {
      console.error("Failed to load admin notifications:", error);
    });

    const joinAdminRoom = () => {
      if (socket.connected) {
        socket.emit("join-admin");
      }
    };

    joinAdminRoom();

    const handleNotification = (payload) => {
      setNotifications((current) => {
        const next = [
          {
            ...payload,
            isRead: false,
            createdAt: payload.createdAt || new Date().toISOString(),
          },
          ...current,
        ].slice(0, 6);
        return next;
      });
      setUnreadCount((current) => current + 1);
    };

    socket.on("connect", joinAdminRoom);
    socket.on("admin-notification", handleNotification);

    return () => {
      socket.off("connect", joinAdminRoom);
      socket.off("admin-notification", handleNotification);
    };
  }, [socket, user]);

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-white border-gray-200 gap-3 sm:gap-0">
      {/* Left section */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <PanelLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile profile - visible only on small screens */}
        <div className="sm:hidden flex items-center gap-2 relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            {user?.avatar ? (
              <img
                className="w-8 h-8 rounded-lg object-cover"
                src={user.avatar}
                alt="Admin profile"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-primary">
                {user?.fullName
                  ?.split(" ")
                  .slice(0, 2)
                  .map((word) => word.charAt(0).toUpperCase())
                  .join("") || "A"}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Middle section - search bar */}
      <div className="w-full sm:flex-1 sm:max-w-md sm:mx-4 order-last sm:order-none">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border-none rounded-lg outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
            type="text"
            placeholder="Search here..."
          />
        </div>
      </div>

      {/* Right section - admin profile and notifications */}
      <div
        className="hidden sm:flex items-center gap-4 relative"
        ref={dropdownRef}
      >
        <button
          className="p-2 rounded-full hover:bg-gray-100 relative"
          onClick={toggleDropdown}
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 min-w-4 h-4 px-1 bg-red-500 rounded-full text-[10px] leading-4 text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={toggleDropdown}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="relative">
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            {user?.avatar ? (
              <img
                className="w-10 h-10 rounded-lg object-cover"
                src={user.avatar}
                alt="Admin profile"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-sm font-bold text-primary">
                {user?.fullName
                  ?.split(" ")
                  .slice(0, 2)
                  .map((word) => word.charAt(0).toUpperCase())
                  .join("") || "A"}
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">
              {user?.fullName
                ?.split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
                )
                .join(" ") || "Admin"}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role || "Administrator"}
            </p>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-20 right-0 w-56 bg-white shadow-xl rounded-xl px-0 py-2 space-y-1 z-50 border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-semibold text-muted mb-1">
                NOTIFICATIONS
              </p>
              <p className="text-sm font-semibold text-primary">
                {unreadCount
                  ? `${unreadCount} unread alert(s)`
                  : "No new alerts"}
              </p>
            </div>

            {notifications.length ? (
              notifications.map((notification, index) => (
                <div
                  key={`${notification.orderId}-${index}`}
                  className={`px-4 py-3 rounded-lg mx-2 border ${
                    notification.isRead
                      ? "border-transparent hover:bg-background"
                      : "border-accent/20 bg-accent/5"
                  }`}
                >
                  <p className="text-sm font-medium text-primary">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {notification.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-muted">
                Notifications will appear here when orders change.
              </div>
            )}

            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-semibold text-muted mb-1">
                ADMIN ACCOUNT
              </p>
              <p className="text-sm font-semibold text-primary">
                {user?.fullName}
              </p>
              <p className="text-xs text-muted mt-1 truncate">{user?.email}</p>
            </div>

            {/* Menu Items */}
            <Link
              to="/admin/profile"
              className="block px-4 py-3 hover:bg-background text-primary font-medium transition-colors duration-150 rounded-lg mx-2"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 hover:bg-danger/10 text-danger font-medium transition-colors duration-150 rounded-lg mx-2 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
