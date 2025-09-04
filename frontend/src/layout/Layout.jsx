import React from "react";
import Navbar from "../Component/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer";
import { ScrollToTop } from "../Component/index.js";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollToTop/>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
