// Login component
// Reused from https://mambaui.com/components/login
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import axios from "axios";

const LoginPage = () => {
  //state for form data to handle input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // to display errors
  const [isLoading, setisLoading] = useState(false); // manage loading state to prevent input

  //handleChange generated by AI, updates formData values with what the user inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //deals with form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    //validates form to ensure text is filled
    if (!formData.email.trim()) {
      setErrors({ ...errors, general: "Please enter your email" });
      setisLoading(false);
      return;
    }
    if (!formData.password.trim()) {
      setErrors({ ...errors, general: "Please enter your password" });
      setisLoading(false);
      return;
    }

    //sending login request to the server
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // response should include user data
      const userData = response.data.user;
      dispatch(login({ userData })); // dispatch login action with user data
      navigate("/"); //navigates to home page upon successful login
      setisLoading(false);
    } catch (error) {
      console.error("Login error:", error.response.data); //invalid user details entered
      setErrors({ ...errors, general: "Invalid login credentials" });
      setisLoading(false); // loading state disable in case of error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF7E0]">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-white dark:bg-[#FFF7E0]">
        <h2 className="mb-3 text-3xl font-semibold text-center text-[#5C3D2E]">
          Login to your account
        </h2>
        <p className="text-sm text-center text-[#5C3D2E]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="focus:underline hover:underline text-[#C9A567]"
          >
            Sign up here
          </Link>
        </p>

        <div className="flex items-center w-full my-4">
          <hr className="w-full text-[#C9A567]" />
          <p className="px-3 text-[#5C3D2E]">OR</p>
          <hr className="w-full text-[#C9A567]" />
        </div>
        {/* displays a loading spinner after login successful and isloading is true */}
        {isLoading ? (
          <div className="flex justify-center items-center my-5">
            <div
              className="w-16 h-16 border-4 border-dashed rounded-full animate-spin "
              style={{ borderColor: "goldenrod transparent" }}
            ></div>
          </div>
        ) : (
          // noValidate means we handle our own validation
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
                  placeholder="test@email.com"
                  className="w-full px-3 py-2 border rounded-md border-[#C9A567] bg-[#FFF7E0] text-[#5C3D2E] focus:border-[#D4AF37]"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm text-[#5C3D2E]">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs hover:underline text-[#C9A567]"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md border-[#C9A567] bg-[#FFF7E0] text-[#5C3D2E] focus:border-[#D4AF37]"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md bg-[#D4AF37] text-[#1A365D]"
            >
              Sign in
            </button>
          </form>
        )}
        {errors.general && (
          <div className="text-red-500 text-xs text-center mt-2">
            {errors.general}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
