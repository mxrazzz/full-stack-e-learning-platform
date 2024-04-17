import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png";

import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Sidebar = ({ isOpen, toggleSidebar, isAuthenticated }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toggleSidebar(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        toggleSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggleSidebar]);

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
              onClick={() => toggleSidebar(false)}
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => toggleSidebar(false)}
            >
              About
            </Link>
            <Link
              to="/tools"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => toggleSidebar(false)}
            >
              Tools
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => toggleSidebar(false)}
            >
              Contact
            </Link>
          </div>
          {isAuthenticated ? (
            <>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="px-2 space-y-1">
                  <Link
                    to="/dashboard"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={() => toggleSidebar(false)}
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
                  {/* View Profile */}
                  <Link
                    to="/view-profile"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={() => toggleSidebar(false)}
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
              </div>
            </>
          ) : (
            <div className="mt-6 pt-6">
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => toggleSidebar(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => toggleSidebar(false)}
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
