// ViewProfile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const ViewProfile = () => {
  const [user, setUser] = useState({ xp: 0, email: "" });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };
    fetchUserProfile();
  }, []);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState(""); // For feedback messages
  const [isError, setIsError] = useState(false); // To differentiate between success and error messages
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChangeClick = () => {
    setIsChangingPassword(true);
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMessage(""); // Reset feedback message
    setIsError(false); // Reset error state

    if (newPassword !== confirmPassword) {
      setIsError(true);
      setFeedbackMessage("New passwords do not match!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/auth/change-password",
        {
          email: user.email,
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      setFeedbackMessage("Password changed successfully!");
      dispatch(logout());

      // Redirect to login
      navigate("/login");
      // Clear the form fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setIsError(true);
      setFeedbackMessage("Failed to change password.");
      console.error("Password change error:", error);
    }
  };

  // Calculate level based on XP
  const calculateLevel = (xp) => {
    return Math.floor(xp / 200) + 1; // Adjust XP calculation as needed
  };

  return (
    <div className="bg-[#FFF7E0] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-10 text-[#5C3D2E]">
          Your Profile
        </h1>

        <div className="max-w-xl mx-auto bg-[#D4AF37] rounded-lg shadow p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 text-sm text-gray-900">{user.email}</div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              XP
            </label>
            <div className="flex items-center mt-1">
              <div className="text-sm text-gray-900 mr-2">{user.xp} XP</div>
              <div className="relative w-64 h-4 bg-gray-200 rounded-full">
                <div
                  className="absolute h-4 rounded-full bg-[#000080]"
                  style={{ width: `${(user.xp % 200) / 2}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-900">
              Level: {calculateLevel(user.xp)}
            </div>
          </div>
          <div>
            {isChangingPassword ? (
              <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 leading-tight focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 leading-tight focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 leading-tight focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1A365D] hover:bg-[#163252] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A365D]"
                >
                  Change Password
                </button>
              </form>
            ) : (
              <button
                onClick={handlePasswordChangeClick}
                className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1A365D] hover:bg-[#163252] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A365D]"
              >
                Change Password
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
