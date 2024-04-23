// component to reset user password, displayed after user presses forgot password and enters their email
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../redux/notificationSlice";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState(""); //state to store the new password
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); //hook to access location state from previous page
  const { email, tempToken } = location.state; //extracted email and token from VerificationCodePage

  //handles form submission after button is pressed
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //request sent to reset password
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        tempToken,
        newPassword,
      });
      //show notification to display successful reset
      dispatch(
        showNotification({
          message: "Password reset successfully!",
        })
      );
      navigate("/login"); // Redirect to login page
    } catch (error) {
      alert("Failed to reset password.");
      console.error("Reset password error:", error);
    }
  };

  //Mix of AI generation to fix visual issues
  //handled input fields myself
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF7E0]">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-white dark:bg-[#FFF7E0]">
        <h2 className="mb-3 text-3xl font-semibold text-center text-[#5C3D2E]">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className="block text-sm text-[#5C3D2E]"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Enter new password"
                className="w-full px-3 py-2 border rounded-md border-[#C9A567] bg-[#FFF7E0] text-[#5C3D2E] focus:border-[#D4AF37]"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-[#D4AF37] text-[#1A365D]"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
