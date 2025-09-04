// src/components/BookListing/RatingFilter.jsx
import React from 'react';
import { Star } from 'lucide-react';

const RatingFilter = ({ value, onChange }) => {
  return (
    <div className="mb-8">
      <h3 className="font-medium text-primary mb-3">Customer Rating</h3>
      <div className="space-y-2">
        {[4, 3, 2, 1].map(rating => (
          <button
            key={rating}
            className={`flex items-center w-full p-2 rounded-md ${
              value === rating 
                ? 'bg-primary/10 border border-accent' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onChange(value === rating ? null : rating)}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted">
              {rating}+ Stars
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;