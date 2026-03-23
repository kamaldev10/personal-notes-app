import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-extrabold text-red-500 drop-shadow-lg">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold">Oops! Page not found</h2>

        <p className="mt-2 text-gray-400">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-xl font-medium shadow-lg hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
