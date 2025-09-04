// src/components/BookListing/Breadcrumb.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-primary" aria-hidden="true" />
            )}
            {index === items.length - 1 ? (
              <span className="text-sm font-medium text-primary">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;