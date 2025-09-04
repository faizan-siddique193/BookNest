// src/components/BookListing/FiltersSidebar.jsx
import React from "react";
import CategoryFilter from "./CategoryFilter";
// import PriceSlider from "./PriceSlider";
import RatingFilter from "./RatingFilter";
import AvailabilityFilter from "./AvailabilityFilter";
import { Filter, X } from "lucide-react";

const FiltersSidebar = ({ categories, filters, onFilterChange }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Filters Button */}
      <button
        className="md:hidden flex items-center justify-center w-full py-3 px-4 rounded-lg bg-white border border-gray-200 text-primary shadow-sm mb-6"
        onClick={() => setMobileOpen(true)}
      >
        <Filter className="h-5 w-5 mr-2" />
        <span className="font-medium">Filters</span>
      </button>

      {/* Filters Sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-50 transform transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-bold text-primary">Filters</h2>
            <button onClick={() => setMobileOpen(false)}>
              <X className="h-5 w-5 text-muted" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto h-[calc(100vh-60px)]">
            <CategoryFilter
              categories={categories}
              selected={filters.categories}
              onChange={(categories) => onFilterChange({ categories })}
            />

                {/*TODO: PRICE SLIDER  */}
           {/*  <PriceSlider
              value={filters.priceRange}
              onChange={(priceRange) => onFilterChange({ priceRange })}
            /> */}
{/* 
            <RatingFilter
              value={filters.rating}
              onChange={(rating) => onFilterChange({ rating })}
            /> */}

            {/* <AvailabilityFilter
              value={filters.availability}
              onChange={(availability) => onFilterChange({ availability })}
            /> */}
          </div>
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block w-full md:w-1/4">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <CategoryFilter
            categories={categories}
            selected={filters.categories}
            onChange={(categories) => onFilterChange({ categories })}
          />
          {/* TODO: PRICE SLIDER */}
          {/* <PriceSlider
            value={filters.priceRange}
            onChange={(priceRange) => onFilterChange({ priceRange })}
          /> */}

          {/* <RatingFilter
            value={filters.rating}
            onChange={(rating) => onFilterChange({ rating })}
          /> */}

         {/*  <AvailabilityFilter
            value={filters.availability}
            onChange={(availability) => onFilterChange({ availability })}
          /> */}
        </div>
      </div>
    </>
  );
};

export default FiltersSidebar;
