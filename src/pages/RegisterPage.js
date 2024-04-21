import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!formData.firstName.trim()) {
      formErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      formErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!regex.test(formData.email)) {
      formErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be more than 6 characters";
    }

    if (!formData.confirmPassword) {
      formErrors.confirmPassword = "Confirming password is required";
    } else if (formData.confirmPassword !== formData.password) {
      formErrors.confirmPassword = "Passwords must match";
    }

    if (!formData.terms) {
      formErrors.terms = "You must agree to the Terms and Conditions";
    }

    return formErrors;
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && !isSubmitting) {
      setIsSubmitting(true);
      try {
        // Send the registration data to the server
        await axios.post("http://localhost:5000/api/auth/register", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });

        navigate("/verify-registration", { state: { email: formData.email } });
      } catch (error) {
        console.error("Registration error:", error.response.data);
        setErrors({
          ...errors,
          general: error.response.data.message || "An error occurred",
        });
        setIsSubmitting(false); // Disable loading state in case of error
      }
    }
  };

  // Inside your RegisterPage component

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF7E0]">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-white dark:bg-[#FFF7E0] dark:text-[#5C3D2E]">
        <h2 className="mb-3 text-3xl font-semibold text-center text-[#5C3D2E]">
          Register for an account
        </h2>

        {isSubmitting ? (
          <div className="flex justify-center items-center">
            <div
              className="w-16 h-16 border-4 border-dashed rounded-full animate-spin "
              style={{ borderColor: "goldenrod transparent" }}
            ></div>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              {/* First Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm text-[#5C3D2E]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-[#FFF7E0] dark:text-[#5C3D2E] focus:dark:border-violet-400"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm text-[#5C3D2E]"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-[#FFF7E0] dark:text-[#5C3D2E] focus:dark:border-violet-400"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm text-[#5C3D2E]">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-[#FFF7E0] dark:text-[#5C3D2E] focus:dark:border-violet-400"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm text-[#5C3D2E]"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-[#FFF7E0] dark:text-[#5C3D2E] focus:dark:border-violet-400"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm text-[#5C3D2E]"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-[#FFF7E0] dark:text-[#5C3D2E] focus:dark:border-violet-400"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-1 border rounded dark:border-gray-700 focus:ring-violet-400"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-[#5C3D2E]">
                  I agree to the{" "}
                  <span
                    className="underline cursor-pointer"
                    onClick={() => navigate("/terms-and-conditions")}
                  >
                    Terms and Conditions
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-xs">{errors.terms}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md bg-[#D4AF37] text-[#1A365D]"
              disabled={isSubmitting}
            >
              Register
            </button>
          </form>
        )}
        {errors.general && (
          <div className="text-red-500 text-xs text-center mt-2">
            {errors.general}
          </div>
        )}
        <p className="mt-4 text-sm text-center text-[#5C3D2E]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="focus:underline hover:underline text-[#C9A567]"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
