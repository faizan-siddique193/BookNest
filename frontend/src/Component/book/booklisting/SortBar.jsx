// src/components/BookListing/SortBar.jsx
import React from 'react';
import { Grid, List, ArrowUpDown } from 'lucide-react';

const SortBar = ({ totalItems, sortOption, viewMode, onSortChange, onViewChange }) => {
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <p className="text-muted mb-4 sm:mb-0">
        Showing <span className="font-medium text-primary">{totalItems}</span> books
      </p>
      
      <div className="flex items-center space-x-4">
        {/* TODO: sort bar */}
        {/* <div className="flex items-center">
          <span className="mr-2 text-muted text-sm">Sort by:</span>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none py-2 pl-3 pr-8 rounded-lg border border-gray-300 bg-white text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
          </div>
        </div> */}
        
        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewChange('grid')}
            className={`p-2 ${viewMode === 'grid' ? 'bg-primary/10' : 'hover:bg-gray-50'}`}
          >
            <Grid className={`h-5 w-5 ${viewMode === 'grid' ? 'text-accent' : 'text-muted'}`} />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={`p-2 border-l border-gray-300 ${viewMode === 'list' ? 'bg-primary/10' : 'hover:bg-gray-50'}`}
          >
            <List className={`h-5 w-5 ${viewMode === 'list' ? 'text-accent' : 'text-muted'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortBar;