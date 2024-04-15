import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setIsLoading(true); // Start loading

    try {
      // Call the backend endpoint with the email
      await axios.post("http://localhost:5000/api/auth/resend-verification", {
        email,
        action: "reset",
      });
      setIsLoading(false); // Stop loading
      // Navigate to verification code page with email as state
      navigate("/verification-code", { state: { email } });
    } catch (error) {
      console.error("Forgot password error:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "There was an error processing your request."
      );
      setIsLoading(false); // Stop loading in case of an error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF7E0]">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-white dark:bg-[#FFF7E0]">
        <h2 className="mb-3 text-3xl font-semibold text-center text-[#5C3D2E]">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-[#5C3D2E]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email@example.com"
                className="w-full px-3 py-2 border rounded-md border-[#C9A567] bg-[#FFF7E0] text-[#5C3D2E] focus:border-[#D4AF37]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading} // Disable input during loading
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-[#D4AF37] text-[#1A365D]"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? "Processing..." : "Send Reset Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
