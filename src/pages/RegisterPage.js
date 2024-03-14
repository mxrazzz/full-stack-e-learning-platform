import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
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
        <form novalidate="" action="" className="space-y-8">
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
                required
              />
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
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="block text-sm text-[#5C3D2E]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-[#FFF7E0] dark:text-[#5C3D2E] focus:dark:border-violet-400"
                required
              />
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="w-4 h-4 mt-1 border rounded dark:border-gray-700 focus:ring-violet-400"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-[#5C3D2E]">
                I agree to the Terms and Conditions
              </label>
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
