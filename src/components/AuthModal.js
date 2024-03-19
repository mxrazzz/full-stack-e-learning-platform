import React from "react";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative p-8 bg-white w-full max-w-lg m-auto flex-col flex rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          You're not logged in!
        </h2>
        <p className="mb-6 text-gray-600">
          Please log in to access the courses.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-2 font-bold text-gray-900 bg-gray-200 hover:bg-gray-300 rounded transition duration-150"
            onClick={onClose}
          >
            Later
          </button>
          <button
            className="px-6 py-2 font-bold text-white bg-gold-500 hover:bg-gold-600 rounded transition duration-150"
            onClick={() => navigate("/login")}
            style={{ backgroundColor: "#1A365D" }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
