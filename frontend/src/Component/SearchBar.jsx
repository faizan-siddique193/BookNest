import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, X } from "lucide-react";
import { setSearchItem, clearFilters } from "../feature/book/bookSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.book.searchItem);

  const handleChange = (e) => {
    dispatch(setSearchItem(e.target.value));
  };

  const handleClear = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="border rounded-lg relative flex items-center bg-white">
      {/* search icon */}
      <Search className="text-[#E67E22] absolute left-2 top-3 w-4 h-4" />

      {/* search input */}
      <input
        value={query}
        type="text"
        placeholder="Search by title, author, category..."
        onChange={handleChange}
        className="w-full py-2 pl-8 pr-8 rounded-lg outline-none text-primary focus:ring-2 ring-[#E67E22] ring-offset-2"
      />

      {/* clear (X) button — only visible when query isn't empty */}
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
