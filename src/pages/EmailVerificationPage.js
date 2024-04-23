//Component to verify email after pressing forgot password
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerificationCodePage = () => {
  // State to hold each digit of the OTP
  const [otp, setOtp] = useState(Array(4).fill("")); //state to store the 4 digit passcode
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); //hook to access location state
  const { email } = location.state; //extracting the email entered from previous page
  const [countdown, setCountdown] = useState(300); //setting a countdown timer of 5 secs for resending code

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
      setLoading(true);
      // Specify the action type when resending the code
      await axios.post("http://localhost:5000/api/auth/resend-verification", {
        email,
        action: "reset", //specified action is register, as this API call can be used to reset password
      });
      setErrorMessage("");
      setLoading(false);
      setCountdown(300); // resets countdown
    } catch (error) {
      console.error("Resend verification error:", error);
      setErrorMessage("Failed to resend verification code.");
      setLoading(false);
    }
  };

  //handles the form submission (when verify button is pressed)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const verificationCode = otp.join(""); //all 4 digits from form field are concatenated into a string

    //request sent to make sure verification code entered by user is correct
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-code",
        {
          email,
          verificationCode,
        }
      );
      navigate("/reset-password", {
        //will navigate user to reset their password once email is verified
        state: { email, tempToken: response.data.tempToken },
      });
    } catch (error) {
      console.error("Verification error:", error);
      setErrorMessage("Invalid or expired verification code.");
    } finally {
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
            {/* AI generated to debug issues with OTP code entering */}
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

export default VerificationCodePage;
