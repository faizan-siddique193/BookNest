import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ className, onSearch, onClear, delay = 300, ...rest }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchRef = useRef(null);

  // Sample book suggestions (replace with API call)
  const bookSuggestions = [
    "The Great Gatsby",
    "To Kill a Mockingbird",
    "1984 by George Orwell",
    "Pride and Prejudice",
    "The Hobbit",
    "Fiction Books",
    "Science Fiction Novels",
    "Best Sellers 2024",
  ];

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 0) {
        const filtered = bookSuggestions.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));

        // Optional: Call API for real search results
        if (onSearch) onSearch(query);
      } else {
        setSuggestions([]);
        if (onClear) onClear();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
      setSuggestions([]);
      searchRef.current.blur();
    }
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    if (onClear) onClear();
    searchRef.current.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    if (onSearch) onSearch(suggestion);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === "Enter" && activeSuggestion >= 0) {
        e.preventDefault();
        handleSuggestionClick(suggestions[activeSuggestion]);
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveSuggestion(-1);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Search books, authors, genres..."
          className={`w-full py-2 pl-10 pr-10 rounded-full border transition-all duration-200 focus:outline-none ${
            isFocused
              ? "border-accent ring-2 ring-accent/30 bg-white shadow-sm"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }`}
          {...rest}
        />

        <button
          type="submit"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-accent transition-colors"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-danger transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </form>

      {/* Suggestions dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setActiveSuggestion(index)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                  index === activeSuggestion ? "bg-gray-50 text-accent" : ""
                }`}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent searches (optional) */}
      {isFocused && query.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-2 text-sm text-gray-500">Recent searches</div>
          {/* You would map through recent searches here */}
          <div className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
            Fantasy novels
          </div>
          <div className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
            Stephen King
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
