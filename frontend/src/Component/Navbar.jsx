import React, { useEffect, useState, useRef } from "react";
import { SearchBar } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../feature/auth/authAction";
import { getFeaturedBooks } from "../feature/book/bookAction";
const Navbar = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [token, setToken] = useState(null);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // get featured books and latest books
  useEffect(() => {
    dispatch(getFeaturedBooks());
  }, [dispatch]);

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

  // handle logout
  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/sign-in");
  };

  // links
  const navLinks = [
 
    {
      id: 1,
      title: "Books",
      link: "/books",
    },
    {
      id: 2,
      title: "Categories",
      link: "/categories",
    },
    {
      id: 3,
      title: "Best Seller",
      link: "/books/featured",
    },
  ];

  return (
    <nav className="w-full bg-primary shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-accent hover:text-secondary transition-colors">
                BookNest
              </h1>
            </Link>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex ml-10">
            <div className="flex items-center space-x-8">
              {navLinks.map((navlink) => (
                <Link
                  key={navlink.id}
                  to={navlink.link}
                  className="text-secondary hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {navlink.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block w-1/3 mx-4">
            <SearchBar />
          </div>

          {/* Icons and Auth */}
          <div className="flex items-center space-x-4">
            <Link
              to="/wishlist"
              className="p-2 rounded-full hover:bg-[#34495E] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5 text-secondary hover:text-accent" />
            </Link>
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-[#34495E] transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5 text-secondary hover:text-accent" />
              {cart?.totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-secondary text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalQuantity}
                </span>
              )}
            </Link>

            {/* User dropdown */}
            <div className="ml-4 relative" ref={dropdownRef}>
              {user ? (
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-[#34495E] transition-colors duration-200"
                >
                  {/* Avatar */}
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="h-8 w-8 rounded-lg object-cover border border-secondary"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-primary">
                      {user?.fullName
                        ?.split(" ")
                        .slice(0, 2)
                        .map((word) => word.charAt(0).toUpperCase())
                        .join("") || "U"}
                    </div>
                  )}
                  <span className="hidden md:inline text-sm font-medium text-secondary">
                    {user?.fullName
                      ?.split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </span>
                </button>
              ) : (
                <Link
                  to="/sign-in"
                  className="flex items-center space-x-1 p-2 rounded-full hover:bg-[#34495E] transition-colors duration-200"
                >
                  <User className="h-5 w-5 text-secondary" />
                  <span className="hidden md:inline text-sm font-medium text-secondary">
                    Account
                  </span>
                </Link>
              )}
              {/* Dropdown would go here */}
              {isDropdownOpen && (
                <div
                  onClick={toggleDropdown}
                  className={`
          absolute top-20 right-0 w-56 bg-white shadow-xl rounded-xl px-0 py-2 space-y-1
          transition-all duration-300 ease-in-out z-50
          ${
            isDropdownOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }
        `}
                >
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs font-semibold text-muted mb-1">
                      ACCOUNT
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      {user?.fullName
                        ?.split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")}
                    </p>
                    <p className="text-xs text-muted mt-1 truncate">
                      {user?.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <Link
                    to="/user/profile"
                    className="block px-4 py-3 hover:bg-background text-primary font-medium transition-colors duration-150 rounded-lg mx-2"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-danger/10 text-danger font-medium transition-colors duration-150 rounded-lg mx-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search bar - visible only on mobile */}
        <div className="md:hidden my-3">
          <SearchBar />
        </div>
        <div className="md:hidden my-3">
          <div className="">
            <div className="flex items-center justify-evenly space-x-8">
              {navLinks.map((navlink) => (
                <Link
                  to={navlink.link}
                  className="text-secondary hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {navlink.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
