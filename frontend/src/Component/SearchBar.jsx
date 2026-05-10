import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, X } from "lucide-react";
import { setSearchItem } from "../feature/book/bookSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.book.searchItem);

  const handleChange = (e) => {
    dispatch(setSearchItem(e.target.value));
  };

  const handleClear = () => {
    dispatch(setSearchItem(""));
  };

  return (
    <div className="border rounded-lg relative flex items-center bg-white">
      {/* search icon */}
      <Search className="text-[#E67E22] absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />

      {/* search input */}
      <input
        value={query}
        type="text"
        placeholder="Search by title, author, category..."
        onChange={handleChange}
        className="w-full py-3 pl-10 pr-10 rounded-lg outline-none text-base text-primary placeholder-gray-400 focus:ring-2 ring-[#E67E22] ring-offset-2"
      />

      {/* clear (X) button — only visible when query isn't empty */}
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
