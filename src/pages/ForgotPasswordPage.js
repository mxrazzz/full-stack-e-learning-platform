// handles forgot password feature for user
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState(""); //setting email state which starts empty
  const [errorMessage, setErrorMessage] = useState(""); // same with setting the error messages
  const [isLoading, setIsLoading] = useState(false); // loading to prevent further button input
  const navigate = useNavigate();

  //function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Resetting error message
    setIsLoading(true); // loading begins as button is pressed

    try {
      // making request to backend to reset password
      await axios.post("http://localhost:5000/api/auth/resend-verification", {
        email,
        action: "reset", //specify it's a reset action, as this API call could be used to send code for registration
      });
      setIsLoading(false); // stops the loading if request was successful
      // Navigate to verification code page and pass the email as a state to ensure data flows smoothly and securely
      navigate("/verification-code", { state: { email } });
    } catch (error) {
      console.error("Forgot password error:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "There was an error processing your request."
      );
      setIsLoading(false); // loading stops after an error
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
                disabled={isLoading} // will disable input during loading
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-[#D4AF37] text-[#1A365D]"
            disabled={isLoading} // will disable button during loading
          >
            {isLoading ? "Processing..." : "Verify your email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
