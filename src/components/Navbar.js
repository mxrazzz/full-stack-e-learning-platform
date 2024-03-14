import React, { useState } from "react";
import logoImage from "../assets/logo.png";

import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="p-4 dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex justify-between h-16 mx-auto">
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <Link
              to="/"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400"
            >
              Home
            </Link>
          </li>
          <li className="flex">
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent"
            >
              Courses
            </a>
          </li>
          <li className="flex">
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent"
            >
              About
            </a>
          </li>
          <li className="flex">
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent"
            >
              Contact
            </a>
          </li>
        </ul>
        <Link
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
          rel="noopener noreferrer"
        >
          <img src={logoImage} alt="Logo" className="w-auto h-16 md:h-24" />
        </Link>

        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative">
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-32 py-2 pl-10 text-sm rounded-md focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-4 h-4"
                >
                  {/* SVG Path for Search Icon */}
                </svg>
              </button>
            </span>
          </div>
          <Link
            to="/login"
            className="px-6 py-2 font-semibold rounded-md text-[#5C3D2E] bg-[#FFF7E0] hover:bg-[#EFE2BA] dark:hover:text-[#C9A567]"
          >
            Log in
          </Link>
          {/* Register Button - More emphasized with a bold and vibrant color */}
          <Link
            to="/register"
            className="px-6 py-2 font-semibold rounded-md text-[#5C3D2E] bg-[#D4AF37] hover:bg-[#C9A567] shadow-lg"
          >
            Register
          </Link>
        </div>
        <button
          className="p-4 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          title="Open menu"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-80 dark:bg-gray-800 dark:text-gray-100 flex justify-center items-center lg:hidden">
          <div className="text-center">
            <ul className="space-y-6">
              <li>
                <a href="#" className="text-xl">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-xl">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-xl">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-xl">
                  Contact
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <input
                type="search"
                name="Search"
                placeholder="Search..."
                className="py-2 pl-10 pr-4 text-sm rounded-md focus:outline-none dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div className="mt-8">
              <button
                type="button"
                className="px-6 py-2 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900 mr-4"
              >
                Log in
              </button>
              <button
                type="button"
                className="px-6 py-2 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
              >
                Register
              </button>
            </div>
            <button
              className="mt-12 px-6 py-2 font-semibold rounded dark:text-gray-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
