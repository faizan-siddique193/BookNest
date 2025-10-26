import { Cart } from "../models/cart.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
const addToCart = asyncHandler(async (req, res) => {
  const { bookId, quantity } = req.body;
  const userId = req.user.user_id;

  if (!bookId) {
    throw new ApiError("404", "Items are required");
  }

  // Ensure quantity is a number and fallback to 1
  const qty = Number(quantity) || 1;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ bookId, quantity: qty }],
    });
  } else {
    // Check if item already exists
    const itemIndex = cart.items.findIndex(
      (item) => item.bookId.toString() === bookId
    );

    if (itemIndex > -1) {
      // Item exists, update quantity safely
      cart.items[itemIndex].quantity =
        Number(cart.items[itemIndex].quantity) + qty;
    } else {
      // Item doesn't exist, push new
      cart.items.push({ bookId, quantity: qty });
    }
  }

  await cart.save();

  cart = await Cart.findOne({ userId }).populate("items.bookId");

  return res.json(new ApiResponse(201, cart, "Item added successfully"));
});

//  update quantity
const updateCart = asyncHandler(async (req, res) => {
  const { bookId, quantity } = req.body;
  const userId = req.user.user_id;

  console.log(
    "Update Cart called with bookId:",
    bookId,
    "and quantity:",
    quantity
  );

  if (!bookId || quantity === undefined) {
    throw new ApiError(400, "Book ID and quantity are required");
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.bookId.toString() === bookId
  );

  if (itemIndex > -1) {
    // Set the quantity to the specific value
    cart.items[itemIndex].quantity = Number(quantity);

    // TODO: Recalculate total
    /*  cart.total = cart.items.reduce((acc, item) => {
      const price = Number(item.bookId?.price) || 0;
      const qty = Number(item.quantity) || 0;
      return acc + price * qty;
    }, 0); */

    await cart.save();

    cart = await Cart.findOne({ userId }).populate("items.bookId");
    return res.json(
      new ApiResponse(200, cart, "Item quantity updated successfully")
    );
  } else {
    throw new ApiError(404, "Item not found in cart");
  }
});

// get cart item
const getCartItem = asyncHandler(async (req, res) => {
  const userId = req.user.user_id;

  // Correct query to find the cart by userId
  const cart = await Cart.findOne({ userId }).populate("items.bookId");

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart items retrieved successfully"));
});

// remove items from cart as wll as delete cart if no items are left
const deleteCartItem = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user.user_id;

  if (!bookId) {
    throw new ApiError(400, "Book ID is required");
  }

  let cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { bookId } } }, // Remove only the matching item
    { new: true } // Return the updated cart
  );

  if (!cart) {
    throw new ApiError(404, "Item not found in cart");
  }

  if (cart.items.length === 0) {
    await cart.save();
    await Cart.findOneAndDelete({ userId });
  } else {
    await cart.save();
    cart = await Cart.findOne({ userId }).populate("items.bookId");
  }

  return res.json(new ApiResponse(200, cart, "Item removed successfully"));
});

export { addToCart, getCartItem, deleteCartItem, updateCart };
