import { Outlet } from "react-router-dom";
import { AdminSidebar, AdminNavbar } from "../Component/index";
import { useState } from "react";
import { motion } from "framer-motion";
const AdminLayout = () => {
  const [toggleSider, setToggleSidbar] = useState("");
  const getToogleValueFromChild = (value) => {
    setToggleSidbar(value);
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}

      {!toggleSider && (
        <motion.aside
        
         className="w-64 bg-primary text-white shadow-md">
          <AdminSidebar />
        </motion.aside>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 bg-gray-50">
        {/* Navbar */}
        <header className="">
          <AdminNavbar onToggleSidebar={getToogleValueFromChild} />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
