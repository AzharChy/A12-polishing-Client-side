import React from 'react';
import error from '../../assets/error.jpg'
import { Link } from 'react-router-dom';

const Errorpage = () => {
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <img
        src={error}
        alt="Error"
        className="w-full max-w-md rounded-lg shadow-lg"
      />
      <h1 className="text-3xl font-bold text-red-600 mt-6">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mt-2 text-center">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-violet-700 text-white rounded-lg shadow-md hover:bg-violet-800 transition"
      >
        Return Home
      </Link>
    </div>
  );
};

export default Errorpage;