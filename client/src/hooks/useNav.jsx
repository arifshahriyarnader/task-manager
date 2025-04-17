import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authServices } from "../auth";

export function useNav() {
  const navigate = useNavigate();
  const isUserLoggedIn = authServices.isUserLoggedIn();
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    if (isUserLoggedIn) {
      const user = JSON.parse(localStorage.getItem("TODO_APP_LOGGED_IN_USER")); // Update the key
      if (user?.fname && user?.lname) {
        setUserName(`${user.fname} ${user.lname}`);
      } else {
        setUserName("User");
      }
    } else {
      setUserName("User");
    }
  }, [isUserLoggedIn]);

  const handleLogout = () => {
    authServices.logout();
    localStorage.removeItem("user"); // Remove user data from localStorage
    setUserName("User"); // Reset username
    navigate("/login");
  };

  const handleProfileClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".dropdown")) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showMenu]);

  const handleTodoClick = (e) => {
    e.preventDefault();
    if (isUserLoggedIn) {
      navigate("/todo");
    } else {
      navigate("/login");
    }
  };

  return {
    isUserLoggedIn,
    showMenu,
    userName,
    handleLogout,
    handleProfileClick,
    handleTodoClick,
  };
}
