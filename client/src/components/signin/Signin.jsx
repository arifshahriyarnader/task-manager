import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="w-full max-w-sm bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 mt-[8px] cursor-pointer text-gray-600"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md font-bold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Signin;
