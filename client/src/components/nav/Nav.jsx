import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex flex-col items-center justify-around px-5 py-5 bg-[#F8F9FA] md:flex-row">
      <div>
        <a href="/" className="font-bold text-3xl" style={{color: '#FF9000'}}>TodoAPP</a>
      </div>
      <ul className="flex flex-col pt-10 items-center gap-18 md:gap-20 cursor-pointer font-bold md:flex-row md:pt-0">
        <Link to="/">
          Home
        </Link>
        <Link to="/todo">
          Todo
        </Link>
        <Link to="/register">
          Sign Up
        </Link>
        <Link to="/login">
          Sign In
        </Link>
        <Link to="/">
          Logout
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
