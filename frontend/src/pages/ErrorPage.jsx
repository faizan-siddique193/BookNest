import React from "react";
import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <div className="max-w-md w-full text-center px-6 py-10 shadow-lg rounded-2xl border border-gray-200">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <LockKeyhole size={48} className="text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-semibold mb-2">Access Restricted</h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page.  
          Only administrators can access this section.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/home"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          >
            Back to Home
          </Link>
          <Link
            to="/sign-in"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login as Admin
          </Link>
        </div>
      </div>

      <footer className="mt-8 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} BookStore Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default ErrorPage;
