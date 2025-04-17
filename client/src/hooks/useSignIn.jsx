import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authServices } from "../auth";
import { toast } from "react-toastify";

export function useSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      type: "email",
      email: formData.email,
      password: formData.password,
    };
    authServices
      .login(payload)
      .then(() => navigate("/"))
      .catch(() => toast.error("Failed to login"));
  };

  return {
    formData,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
  };
}
