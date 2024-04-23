// Modal to display when trying to enroll on a plan while not logged in
// Adapted from https://mambaui.com/components/modal, added close and login buttons with features
import React from "react";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col max-w-xl gap-4 p-8 rounded-lg shadow-lg bg-[#FFF7E0] text-[#5C3D2E]">
        <h2 className="flex items-center gap-2 text-2xl font-semibold leading-tight tracking-wide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-8 h-8 fill-current shrink-0 text-[#C9A567]"
          >
            <path d="M451.671,348.569,408,267.945V184c0-83.813-68.187-152-152-152S104,100.187,104,184v83.945L60.329,348.568A24,24,0,0,0,81.432,384h86.944c-.241,2.636-.376,5.3-.376,8a88,88,0,0,0,176,0c0-2.7-.135-5.364-.376-8h86.944a24,24,0,0,0,21.1-35.431ZM312,392a56,56,0,1,1-111.418-8H311.418A55.85,55.85,0,0,1,312,392ZM94.863,352,136,276.055V184a120,120,0,0,1,240,0v92.055L417.137,352Z"></path>
            <rect width="32" height="136" x="240" y="112"></rect>
            <rect width="32" height="32" x="240" y="280"></rect>
          </svg>
          You're not logged in!
        </h2>
        <p className="text-lg">Please log in to access the courses.</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-2 font-bold text-[#5C3D2E] bg-white hover:bg-[#EEDCB3] rounded transition duration-150"
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
