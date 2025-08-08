import React, { useState } from "react";
import Register from "../assets/signup.svg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registeration = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isUsernameFocused,setIsUsernameFocused] = useState(false);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const requirements = [];

    if (password.length < minLength)
      requirements.push(`at least ${minLength} characters`);
    if (!hasUpperCase) requirements.push("an uppercase letter");
    if (!hasLowerCase) requirements.push("a lowercase letter");
    if (!hasNumbers) requirements.push("a number");
    if (!hasSpecialChars) requirements.push("a special character");

    return {
      isValid: requirements.length === 0,
      requirements,
    };
  };

  // Add a handler to force lowercase on username input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert username to lowercase automatically
    const finalValue = name === "username" ? value.toLowerCase() : value;
    setCredentials({ ...credentials, [name]: finalValue });

    // Clear errors when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  //   validation function to check form inputs
  const validateForm = () => {
    const newErrors = {};
    const lowercaseRegex = /^[a-z0-9_]+$/;

    if (!credentials.username.trim()) {
      newErrors.username = "Username is required";
    } else if (credentials.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!lowercaseRegex.test(credentials.username)) {
      newErrors.username =
        "Username must contain only lowercase letters, numbers, or underscore";
    }

    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
    } else {
      const { isValid, requirements } = validatePassword(credentials.password);
      if (!isValid) {
        newErrors.password = `Password must contain ${requirements.join(", ")}`;
      }
    }

    if (!credentials.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (credentials.password !== credentials.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/auth/registration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await response.json();
        if (data?.authToken) {
          localStorage.setItem("token", data.authToken);
          toast.success("Registration successful!");
          navigate("/login");
        } else if (data?.error) {
          toast.error(data.error);
        } else {
          toast.error("Registration failed. Please try again.");
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
      <div className="bg-gradient-to-r from-[#2A7B9B] via-[#57C785] to-[#EDDD53] min-h-screen px-4 py-6 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[800px] mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Image Section - Hidden on mobile */}
            <div className="hidden md:flex md:w-1/2">
              <img
                src={Register}
                alt="Registration"
                className="w-full h-auto object-contain "
              />
            </div>

            {/* Vertical Divider - Hidden on mobile */}
            <div className="hidden md:block w-[1px] self-stretch bg-gray-300"></div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 space-y-4">
              <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Registration Page
                  </h2>
                  <hr className="w-[200px] sm:w-[250px] h-[2px] bg-gray-200 mt-2 mx-auto" />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    onFocus={()=>setIsUsernameFocused(true)}
                    placeholder="Enter your username"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2B6C] transition-all ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                 
                  {errors.username ? (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username}
                    </p>
                  ): isUsernameFocused ? (
                     <p className="text-gray-500 text-xs mt-1">
                    Username can only contain lowercase letters, numbers, and
                    underscore
                  </p>
                  ) : null}
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
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2B6C] transition-all ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Create a password"
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

                  {errors.password ? (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  ) : isPasswordFocused ? (
                    <p className="text-gray-500 text-xs mt-1">
                      Password must be at least 8 characters long and contain
                      uppercase, lowercase, number and special character
                    </p>
                  ) : null}
                </div>

                <div className="relative">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Confirm Password
                  </label>

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={credentials.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2B6C] transition-all ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[35px] text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>

                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white text-xl py-2 sm:py-3 px-4 rounded-md 
                    transition-all duration-300 
                    ${
                      loading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-blue-950 hover:scale-[1.02] cursor-pointer"
                    }
                    shadow-md hover:shadow-lg`}
                  >
                    {loading ? (
                      <span className="inline-flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating Account...
                      </span>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="text-gray-600 text-sm">
                    Already registered?
                  </span>
                  <Link
                    to="/login"
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium hover:underline"
                  >
                    Login
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

export default Registeration;
