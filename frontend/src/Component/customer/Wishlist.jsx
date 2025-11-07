import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishlistItem } from "../../feature/wishlist/wishlistAction";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  console.log("Wishlist item in the user profile page:: ", wishlist);

  useEffect(() => {
    dispatch(getWishlistItem());
  }, [dispatch]);

  return (
    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-4 gap-4 ">
      {wishlist &&
        wishlist.map((book) => (
          <div
            key={book.bookId}
            className=" h-54 rounded-lg border border-red-600"
          >
            <img
              className="w-full h-full object-cover rounded"
              src={book.image}
              alt={book.title}
            />
          </div>
        ))}
    </div>
  );
};

export default Wishlist;
