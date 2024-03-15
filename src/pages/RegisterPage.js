import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setIsSubmitting(true);

    if (Object.keys(validationErrors).length === 0 && isSubmitting) {
      console.log("Form data submitted:", formData);
      // Proceed with API call
      // Reset form or redirect user after successful submission
    }
  };
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF7E0]">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-white dark:bg-[#FFF7E0] dark:text-[#5C3D2E]">
        <h2 className="mb-3 text-3xl font-semibold text-center text-[#5C3D2E]">
          Register for an account
        </h2>
        <div className="my-6 space-y-4">
          <button
            aria-label="Sign up with Google"
            type="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:dark:ring-violet-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Sign up with Google</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-400" />
          <p className="px-3 dark:text-gray-400">OR</p>
          <hr className="w-full dark:text-gray-400" />
        </div>
        <form noValidate onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
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
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
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
          >
            Register
          </button>
        </form>
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
