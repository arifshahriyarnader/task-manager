import { toast } from "react-toastify";
import { authServices } from "../auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function useSignUp() {
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
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        toast.error(validationErrors.map((err) => err.msg).join("\n"));
      } else {
        toast.error("Failed to sign up. Please try again.");
      }
    }
  };
  return {
    formData,
    handleChange,
    handleSubmit,
    honeypot,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
}
