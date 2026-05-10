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
    {
      id: 4,
      title: "AI Concierge",
      link: "/ai-concierge",
    },
  ];

  return (
    <nav className="w-full bg-primary shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Main Navbar Row */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-accent hover:text-secondary transition-colors">
              BookNest
            </h1>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex gap-8">
            {navLinks.map((navlink) => (
              <Link
                key={navlink.id}
                to={navlink.link}
                className="text-secondary hover:text-accent px-2 py-2 rounded-md text-base font-medium transition-colors"
              >
                {navlink.title}
              </Link>
            ))}
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block flex-1 max-w-xs mx-4">
            <SearchBar />
          </div>

          {/* Right Side Icons and Auth */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="p-2 rounded-full hover:bg-[#34495E] transition-colors flex-shrink-0"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="h-5 w-5 text-secondary hover:text-accent" />
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-[#34495E] transition-colors relative flex-shrink-0"
              aria-label="Shopping Cart"
              title="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5 text-secondary hover:text-accent" />
              {cart?.totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-secondary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalQuantity}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative flex-shrink-0" ref={dropdownRef}>
              {user ? (
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-[#34495E] transition-colors"
                  title={user?.fullName}
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="h-8 w-8 rounded-lg object-cover border border-secondary"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-lg bg-gray-300 flex items-center justify-center text-xs font-bold text-primary">
                      {user?.fullName
                        ?.split(" ")
                        .slice(0, 2)
                        .map((word) => word.charAt(0).toUpperCase())
                        .join("") || "U"}
                    </div>
                  )}
                  <span className="hidden sm:inline text-sm font-medium text-secondary whitespace-nowrap">
                    {user?.fullName
                      ?.split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase(),
                      )
                      .join(" ")}
                  </span>
                </button>
              ) : (
                <Link
                  to="/sign-in"
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-[#34495E] transition-colors"
                >
                  <User className="h-5 w-5 text-secondary" />
                  <span className="hidden sm:inline text-sm font-medium text-secondary">
                    Sign In
                  </span>
                </Link>
              )}

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 w-56 bg-white shadow-xl rounded-xl mt-2 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-xs font-semibold text-muted uppercase">
                      Account
                    </p>
                    <p className="text-base font-semibold text-primary mt-1">
                      {user?.fullName
                        ?.split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase(),
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
                    className="block px-4 py-2 hover:bg-gray-100 text-primary font-medium text-sm transition-colors rounded-lg mx-1 my-1"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-danger/10 text-danger font-medium text-sm transition-colors rounded-lg mx-1"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Visible only on medium screens and below */}
        <div className="lg:hidden pb-3">
          <SearchBar />
        </div>

        {/* Mobile Navigation - Visible only on medium screens and below */}
        <div className="lg:hidden pb-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
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
      </div>
    </nav>
  );
};

export default Navbar;
