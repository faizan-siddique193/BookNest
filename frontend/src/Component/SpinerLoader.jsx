import React from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SpinerLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <AiOutlineLoading3Quarters 
          className="text-3xl sm:text-4xl text-indigo-600 animate-spin"
          style={{ animationDuration: '0.8s' }}
        />
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default SpinerLoader;