import React, { useState } from "react";
import logoImage from "../assets/logo.png";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = false;
  return (
    <>
      <header className="p-4 dark:bg-gray-800 dark:text-gray-100">
        <div className="container flex justify-between h-16 mx-auto">
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 -mb-1 border-b-2 border-[#C9A567] text-gray-100"
                    : "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-gray-100 hover:text-[#C9A567]"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 -mb-1 border-b-2 border-[#C9A567] text-gray-100"
                    : "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-gray-100 hover:text-[#C9A567]"
                }
              >
                Courses
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 -mb-1 border-b-2 border-[#C9A567] text-gray-100"
                    : "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-gray-100 hover:text-[#C9A567]"
                }
              >
                About
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 -mb-1 border-b-2 border-[#C9A567] text-gray-100"
                    : "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-gray-100 hover:text-[#C9A567]"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <Link
            to="/"
            aria-label="Back to homepage"
            className="flex items-center"
          >
            <img src={logoImage} alt="Logo" className="w-auto h-24 md:h-24" />{" "}
            {/* Adjust the height as needed */}
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
      </header>
      <Sidebar
        isOpen={isMenuOpen}
        toggleSidebar={() => setIsMenuOpen(false)}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
}

export default Navbar;
