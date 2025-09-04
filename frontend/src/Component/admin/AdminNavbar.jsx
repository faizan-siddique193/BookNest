import React, { useState } from "react";
import { PanelLeft, Search, Bell, ChevronDown } from "lucide-react";

const AdminNavbar = ({ onToggleSidebar }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleToggleSidebar = () => {
    const newValue = !toggleSidebar;
    setToggleSidebar(newValue);
    onToggleSidebar(newValue);
  };

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-white  border-gray-200 gap-3 sm:gap-0">
      {/* Left section - menu button and title */}
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
        <div className="sm:hidden flex items-center gap-2">
          <img 
            className="w-8 h-8 rounded-full object-cover" 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="Admin profile" 
          />
          <ChevronDown className="w-4 h-4 text-gray-500" />
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
      <div className="hidden sm:flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            <img 
              className="w-10 h-10 rounded-full object-cover" 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Admin profile" 
            />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">Admin</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;