import React from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Navigater = () => {
  return (
    <div className="mb-4 sm:mb-6">
      <Link 
        to="/" 
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 text-sm sm:text-base"
        aria-label="Go back"
      >
        <FiArrowLeft className="mr-2 text-lg" />
        <span className="font-medium">Back to Home</span>
      </Link>
    </div>
  );
};

export default Navigater;