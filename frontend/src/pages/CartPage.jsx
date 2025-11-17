import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, ShoppingCart } from "lucide-react";
import CartItemsList from "../Component/cart/CartItemsList";
import CartSummary from "../Component/cart/CartSummary";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartItem,
  deleteCartItem,
  updateCartItemQuantity,
} from "../feature/cart/cartAction";
import { toast } from "react-toastify";
import {
  removeItemOptimistic,
  updateQuantityOptimistic,
} from "../feature/cart/cartSlice";

const CartPage = () => {
  // In CartPage.jsx
  const { cart, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Handle quantity change with optimistic updates
  const handleQuantityChange = useCallback(
    async (bookId, newQuantity) => {
      dispatch(updateQuantityOptimistic({ bookId, quantity: newQuantity }));

      try {
        await dispatch(
          updateCartItemQuantity({ bookId, quantity: newQuantity })
        ).unwrap();
      } catch (error) {
        // Revert on error
        dispatch(getCartItem());
        toast.error(error?.message || "Failed to update cart");
      }
    },
    [dispatch]
  );

  // Handle item removal with optimistic updates
  const handleRemoveItem = useCallback(
    async (bookId) => {
      // Optimistic update
      console.log("delete quantity for bookId:", bookId._id);
      // Optimistic update
      dispatch(removeItemOptimistic({ bookId: bookId._id }));

      try {
        await dispatch(deleteCartItem({ bookId: bookId._id })).unwrap();
      } catch (error) {
        // Revert on error
        dispatch(getCartItem());
        toast.error(error?.message || "Failed to remove book from cart");
      }
    },
    [dispatch]
  );

  // get cart items on mount
  useEffect(() => {
    dispatch(getCartItem());
  }, []);

  // Empty cart state
  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-xl shadow-sm p-12 max-w-2xl mx-auto">
          <ShoppingCart className="h-16 w-16 text-muted mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-primary mb-4">
            Your cart is empty
          </h2>
          <p className="text-muted mb-6">
            Looks like you haven't added any books to your cart yet.
          </p>
          <Link
            to="/books"
            className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-xl shadow hover:bg-primary/90 transition"
          >
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-8 flex items-center">
          <ShoppingCart className="h-8 w-8 mr-3" />
          Your Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-2/3">
            <CartItemsList
              items={cart.items}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
            />
          </div>

          {/* Cart Summary */}
          <div className="lg:w-1/3">
            <CartSummary
              subtotal={cart.total}
              totalQuantity={cart.totalQuantity}
              // shippingFee={shippingFee} // optional
              total={cart.total}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
