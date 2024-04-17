import React, { useState, useEffect } from "react";
import logoImage from "../assets/logo.png";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.body.addEventListener("click", closeDropdown);
    return () => {
      document.body.removeEventListener("click", closeDropdown);
    };
  }, []);

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
                to="/tools"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 -mb-1 border-b-2 border-[#C9A567] text-gray-100"
                    : "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-gray-100 hover:text-[#C9A567]"
                }
              >
                Tools
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
                    <svg
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 dark:text-gray-100"
                    >
                      <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                    </svg>
                  </svg>
                </button>
              </span>
            </div>
            {isAuthenticated ? (
              <div className="relative">
                {/* User Info and Dropdown Toggle */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="cursor-pointer flex items-center space-x-2"
                >
                  {/* User Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-8 h-8 fill-current text-[#C9A567]"
                  >
                    <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
                  </svg>
                  <span>{userData.firstName}</span>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-1 rounded-md">
                    <Link
                      to="/dashboard"
                      className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        className="mr-4 h-6 w-6 fill-current dark:text-gray-400"
                      >
                        <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V288H64V64H512z" />
                      </svg>
                      Dashboard
                    </Link>
                    <Link
                      to="/view-profile"
                      className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="mr-4 h-6 w-6 fill-current dark:text-gray-400"
                      >
                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                      </svg>
                      View Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 w-full text-left"
                    >
                      <svg
                        className="mr-4 h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 5a2 2 0 012-2h6a2 2 0 012 2v3a1 1 0 102 0V5a4 4 0 00-4-4H5a4 4 0 00-4 4v10a4 4 0 004 4h6a4 4 0 004-4v-3a1 1 0 10-2 0v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm12 5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-4">
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
            )}
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
