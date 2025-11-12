import React, { useEffect, useState } from "react";
import { SearchBar } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, Menu, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../feature/auth/authAction";
import { toast } from "react-toastify";
import { getCartItem } from "../feature/cart/cartAction";
import { getWishlistItem } from "../feature/wishlist/wishlistAction";
import { getFeaturedBooks } from "../feature/book/bookAction";
const Navbar = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [token, setToken] = useState(null);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  /* 
  // ger cart and items items on mount
  useEffect(() => {
    dispatch(getCartItem());
    dispatch(getWishlistItem());
  }, [dispatch]); */

  // get featured books and latest books
  useEffect(() => {
    dispatch(getFeaturedBooks());
  }, [dispatch]);

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
      link: "/home/books",
    },
    {
      id: 2,
      title: "Categories",
      link: "/home/categories",
    },
    {
      id: 3,
      title: "Best Seller",
      link: "/home/books/featured",
    },
  ];

  return (
    <nav className="w-full bg-primary shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/home" className="flex-shrink-0">
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

          {/* <div className="hidden md:flex ml-10">
            <div className="flex items-center space-x-8">
              <Link
                to="/books"
                className="text-secondary hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Books
              </Link>
              <Link
                to="/categories"
                className="text-secondary hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/deals"
                className="text-secondary hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Best Sellers
              </Link>
              <Link
                to="/about"
                className="text-secondary hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About Us
              </Link>
            </div>
          </div> */}

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block w-1/3 mx-4">
            <SearchBar />
          </div>

          {/* Icons and Auth */}
          <div className="flex items-center space-x-4">
            <Link
              to="/home/wishlist"
              className="p-2 rounded-full hover:bg-[#34495E] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5 text-secondary hover:text-accent" />
            </Link>
            <Link
              to="/home/cart"
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
            <div className="ml-4 relative">
              {user ? (
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-1 p-2 rounded-full hover:bg-[#34495E] transition-colors duration-200"
                >
                  <User className="h-5 w-5 text-secondary" />
                  <span className="hidden md:inline text-sm font-medium text-secondary">
                    {user?.fullName}
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
          absolute top-20 right-0 w-28 bg-white shadow-lg rounded-lg px-4 py-3 space-y-3
          transition-all duration-300 ease-in-out
          ${
            isDropdownOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }
        `}
                >
                  <Link
                    to="/home/user/profile"
                    className="block hover:text-accent"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-accent"
                  >
                    Logout <ArrowRight className="w-4 h-4" />
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
