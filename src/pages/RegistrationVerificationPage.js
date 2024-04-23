// Component for verifying user straight after registration
// similar code structure to EmailVerificationPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../redux/notificationSlice";

const RegistrationVerificationPage = () => {
  const [otp, setOtp] = useState(Array(4).fill("")); //state to store the 4 digit passcode
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); //hook to access location state
  const { email } = location.state; //extracting the email from the state during registration
  const [countdown, setCountdown] = useState(300); // countdown for code resend

  //handles changes in the form field
  //AI generated function, struggled to handle form changes
  const handleChange = (element, index) => {
    if (!/^\d*$/.test(element.value)) return; // Only allow numeric input
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // focuses on the next input field
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  //manages the countdown function for resending the code
  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((currentCountdown) => {
          if (currentCountdown <= 1) {
            clearInterval(interval);
            return 0;
          }
          return currentCountdown - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // clears the interval when countdown ends
  }, [countdown]);

  //function to resend verification code
  const resendCode = async () => {
    try {
      setisLoading(true);

      await axios.post("http://localhost:5000/api/auth/resend-verification", {
        email,
        action: "register", //specified action is register, as this API call can be used to reset password
      });
      setErrorMessage("");
      setisLoading(false);
      setCountdown(300); // resets countdown
    } catch (error) {
      console.error("Resend verification error:", error);
      setErrorMessage("Failed to resend verification code.");
      setisLoading(false);
    }
  };

  //handles the form submission (when verify button is pressed)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const verificationCode = otp.join(""); //all 4 digits from form field are concatenated into a string

    //request sent to verify email with the code user inputted
    try {
      await axios.post("http://localhost:5000/api/auth/verify-email", {
        email,
        verificationCode,
      });
      //show notification upon successful verification
      dispatch(
        showNotification({ message: "Registration successful! You may login" })
      );
      navigate("/login"); //redirects to login
    } catch (error) {
      console.error("Verification error:", error);
      setErrorMessage("Invalid or expired verification code.");
      setisLoading(false);
    }
  };

  // AI generation: fixing div issues, debugging for displaying the otp form
  // i created the OTP form myself via trial and error and online guides
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF7E0]">
      <div
        className={`w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-white dark:bg-[#FFF7E0] ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        <h2 className="mb-3 text-3xl font-semibold text-center text-[#5C3D2E]">
          Enter Verification Code
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between space-x-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="tel"
                className="w-full px-3 py-2 border rounded-md border-[#C9A567] bg-[#FFF7E0] text-[#5C3D2E] focus:border-[#D4AF37] text-center"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                disabled={isLoading}
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-[#D4AF37] text-[#1A365D]"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
        {/* resend code function implemented by AI */}
        {countdown > 0 ? (
          <p>Resend code in: {countdown} seconds</p>
        ) : (
          <button onClick={resendCode} disabled={isLoading}>
            Resend Code
          </button>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default RegistrationVerificationPage;
