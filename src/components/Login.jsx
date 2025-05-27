import React, { useState } from "react";
import LoginPic from "../assets/login.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";


const Login = () => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    // Clear errors when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!credentials.password.trim()) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();
        if (data?.authToken) {
          localStorage.setItem("token", data.authToken);
          toast.success("Login successful!");
          navigate("/home");
        } else if (data?.error) {
          toast.error(data.error);
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-[#2A7B9B] via-[#57C785] to-[#EDDD53] min-h-screen px-4 py-6 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[800px] mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Image Section - Hidden on mobile */}
            <div className="hidden md:flex md:w-1/2">
              <img
                src={LoginPic}
                alt="Login"
                className="w-full h-auto object-contain "
              />
            </div>

            {/* Vertical Divider - Hidden on mobile */}
            <div className="hidden md:block w-[1px] self-stretch bg-gray-300"></div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 py-4  space-y-4">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Login Page
                  </h2>
                  <hr className="w-[200px] sm:w-[250px] h-[2px] bg-gray-200 mt-2 mx-auto" />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2B6C] transition-all ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2B6C] transition-all ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[35px] text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>


                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-blue-500 text-white text-xl py-2 sm:py-3 px-4 rounded-md 
                    transition-all duration-300 
                    ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-950 hover:scale-[1.02] cursor-pointer'}
                    shadow-md hover:shadow-lg`}
                >
                  {loading ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 ">
                  <span className="text-gray-600 text-sm">
                    Not registered yet?
                  </span>
                  <Link
                    to="/"
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium hover:underline"
                  >
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
