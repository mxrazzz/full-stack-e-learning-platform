import React from "react";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative p-8 bg-white w-full max-w-lg m-auto flex-col flex rounded-lg shadow-lg border border-[#C9A567]">
        <h2 className="text-2xl font-bold text-[#5C3D2E] mb-4">
          You're not logged in!
        </h2>
        <p className="mb-6 text-[#5C3D2E]">
          Please log in to access the courses.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-2 font-bold text-[#5C3D2E] bg-[#FFF7E0] hover:bg-[#EEDCB3] rounded transition duration-150"
            onClick={onClose}
          >
            Later
          </button>
          <button
            className="px-6 py-2 font-bold text-white bg-[#C9A567] hover:bg-[#B89C53] rounded transition duration-150"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
