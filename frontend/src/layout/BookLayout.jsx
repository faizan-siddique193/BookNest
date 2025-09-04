/* import React from "react";
import { useLocation } from "react-router-dom";
import { AddBook, BookManagement, EditBook } from "../pages/index";

const BookLayout = () => {
  const location = useLocation();

  const returnActivePage = (route) => {
    switch (route) {
      case "/admin/books":
        return <BookManagement />;
      case "/admin/books/add":
        return <AddBook />;
      case "/admin/books/edit":
        return <EditBook />;
      default:
        return <BookManagement />; // fallback
    }
  };

  return <div>{returnActivePage(location.pathname)}</div>;
};

export default BookLayout;
 */


/* 
import { Routes, Route } from "react-router-dom";
import { AddBook, BookManagement, EditBook } from "../pages/index";

const BookLayout = () => {
  return (
    <Routes>
      <Route path="/admin/books" element={<BookManagement />} />
      <Route path="/admin/books/add" element={<AddBook />} />
      <Route path="/admin/books/edit/:id" element={<EditBook />} /> 
    </Routes>
  );
}; */


import { Outlet } from "react-router-dom";

const BookLayout = () => {
  return (
    <div>
      <Outlet /> {/* This renders BookManagement, AddBook, or EditBook */}
    </div>
  );
};


export default BookLayout;
