import React from "react";
import { LayoutDashboard, BookOpen, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
const AdminSidebar = () => {
  const sidebarLinks = [
    {
      id: 1,
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      link: "/admin/dashboard",
    },
    {
      id: 2,
      name: "Books",
      icon: <BookOpen size={20} />,
      link: "/admin/books",
    },
    {
      id: 3,
      name: "Profile",
      icon: <User size={20} />,
      link: "/admin/profile",
    },
    {
      id: 4,
      name: "Logout",
      icon: <LogOut size={20} />,
      link: "/logout",
    },
  ];
  return (
    <div className="bg-primary h-full ">
      {/* book logo */}
      <div className="py-4 px-5 border-b border-muted">
        <Link to="/admin" className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-accent hover:text-secondary transition-colors">
            BookNest
          </h1>
        </Link>
      </div>

      {/* main section */}
      <div className="space-y-3 mt-5 px-2">
        {sidebarLinks.map((item) => (
          <Link
            key={item?.name}
            to={item?.link}
            className="flex items-center gap-3 px-3 py-2 text-background hover:bg-[#34495E]  transition-colors duration-300 rounded-sm"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
