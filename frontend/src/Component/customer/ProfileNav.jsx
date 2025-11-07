import React from "react";
import { User, Package, Bookmark, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../feature/auth/authAction";

const ProfileNav = ({ activeTab, setActiveTab }) => {
  const { loading } = useSelector((state) => state.auth);
  const dispath = useDispatch();

  // handle logout
  const handleLogout = () => {
    dispath(userLogout());
  };

  const navItems = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "orders", icon: Package, label: "Orders" },
    { id: "wishlist", icon: Bookmark, label: "Wishlist" },
  ];
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              activeTab === item.id
                ? "bg-primary/10 text-accent"
                : "text-muted hover:bg-gray-50"
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <button
          className="w-full flex items-center px-4 py-3 rounded-lg text-muted hover:bg-gray-50 transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileNav;
