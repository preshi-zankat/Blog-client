import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold">
          <Link to="/" className="hover:text-gray-200 transition duration-200">
            Blog
          </Link>
        </h1>
        <div className="space-x-6">
          <Link
            to="/"
            className="text-lg font-medium hover:text-gray-200 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/admin"
            className="text-lg font-medium hover:text-gray-200 transition duration-200"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
