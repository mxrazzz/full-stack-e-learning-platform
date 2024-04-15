import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const RegistrationVerificationPage = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;
  const [countdown, setCountdown] = useState(5); // Countdown for code resend

  const handleChange = (element, index) => {
    if (!/^\d*$/.test(element.value)) return; // Only allow numeric input
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  useEffect(() => {
    let interval; // Declare interval outside to ensure it can be cleared later
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

    return () => clearInterval(interval); // Cleanup the interval on component unmount or when countdown ends
  }, [countdown]);

  const resendCode = async () => {
    try {
      setLoading(true);
      // Specify the action type when resending the code
      await axios.post("http://localhost:5000/api/auth/resend-verification", {
        email,
        action: "register",
      });
      setErrorMessage("");
      setLoading(false);
      setCountdown(300); // Reset countdown
    } catch (error) {
      console.error("Resend verification error:", error);
      setErrorMessage("Failed to resend verification code.");
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const verificationCode = otp.join("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-email",
        {
          email,
          verificationCode,
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Verification error:", error);
      setErrorMessage("Invalid or expired verification code.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF7E0]">
      <div
        className={`w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-white dark:bg-[#FFF7E0] ${
          loading ? "opacity-50" : ""
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
                disabled={loading}
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-[#D4AF37] text-[#1A365D]"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
        {countdown > 0 ? (
          <p>Resend code in: {countdown} seconds</p>
        ) : (
          <button onClick={resendCode} disabled={loading}>
            Resend Code
          </button>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default RegistrationVerificationPage;
