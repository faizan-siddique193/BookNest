// src/components/BookListing/AvailabilityFilter.jsx
import React from 'react';

const AvailabilityFilter = ({ value, onChange }) => {
  const options = [
    { value: 'all', label: 'All' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'pre-order', label: 'Pre-order' }
  ];

  return (
    <div>
      <h3 className="font-medium text-primary mb-3">Availability</h3>
      <div className="space-y-2">
        {options.map(option => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              name="availability"
              className="h-4 w-4 text-accent"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="ml-2 text-sm text-muted">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityFilter;