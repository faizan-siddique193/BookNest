// src/components/BookListing/CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ categories, selected, onChange }) => {
  const handleChange = (category) => {
    if (selected.includes(category)) {
      onChange(selected.filter(c => c !== category));
    } else {
      onChange([...selected, category]);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="font-medium text-primary mb-3">Categories</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {categories.map(category => (
          <label key={category} className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-accent rounded border-gray-300 focus:ring-accent"
              checked={selected.includes(category)}
              onChange={() => handleChange(category)}
            />
            <span className="ml-2 text-sm text-muted">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;