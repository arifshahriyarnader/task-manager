import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { authServices } from "../../auth";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "honeypot") {
      setHoneypot(e.target.value);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  //validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //validate password format
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) {
      toast.error("Bot Detected. Submission rejected");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!isValidPassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords Do not match");
      return;
    }
    const payload = {
      fname: formData.fname,
      lname: formData.lname,
      email: formData.email,
      password: formData.password,
      userType: formData.userType,
    };

    try {
      await authServices.signup(payload);
      toast.success("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        toast.error(validationErrors.map((err) => err.msg).join("\n"));
      } else {
        toast.error("Failed to sign up. Please try again.");
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md bg-white p-8 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {/* Honeypot Field hidden from users */}
        <input
          type="text"
          name="honeypot"
          value={honeypot}
          onChange={handleChange}
          className="hidden"
          autoComplete="off"
        />
        <div className="mb-4">
          <label
            htmlFor="fname"
            className="block text-gray-700 font-medium mb-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lname"
            className="block text-gray-700 font-medium mb-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
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

        <div className="mb-6 relative">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-medium mb-1"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 mt-[8px] cursor-pointer text-gray-600"
          >
            {showConfirmPassword ? (
              <FaEyeSlash size={20} />
            ) : (
              <FaEye size={20} />
            )}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md font-bold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Sign Up
        </button>
        <p className="text-center mt-4 text-gray-600">
          I have an account.{" "}
          <Link
            to="/login"
            className="text-orange-500 font-bold hover:underline"
          >
            Please Login
          </Link>
        </p>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Signup;
