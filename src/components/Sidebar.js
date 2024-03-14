import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png";

const Sidebar = ({ isOpen, toggleSidebar, isAuthenticated }) => {
  return (
    <div
      className={`fixed inset-0 z-40 flex lg:hidden transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={toggleSidebar}
      ></div>
      <div
        className={`relative flex-1 flex flex-col max-w-xs w-full bg-gray-800 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-0 right-0 p-4">
          <button
            className="text-gray-300 hover:text-white"
            onClick={toggleSidebar}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-shrink-0 flex items-center px-4 py-4">
          <img src={logoImage} alt="Logo" className="h-14 w-auto" />
        </div>
        <nav className="mt-5 flex-shrink-0 h-full divide-y divide-gray-700 overflow-y-auto">
          <div className="px-2 space-y-1">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Courses
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
          </div>
          {isAuthenticated ? (
            <div className="mt-6 pt-6">
              <div className="px-2 space-y-1">
                <Link
                  to="/profile"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  View Profile
                </Link>
                <Link
                  to="/settings"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Settings
                </Link>
                {/* Implement logout functionality */}
              </div>
            </div>
          ) : (
            <div className="mt-6 pt-6">
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
