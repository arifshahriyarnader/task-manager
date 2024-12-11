import React from "react";

const Nav = () => {
  return (
    <nav className="flex flex-col items-center justify-around px-5 py-5 bg-[#F8F9FA] md:flex-row">
      <div>
        <a href="/" className="font-bold text-3xl" style={{color: '#FF9000'}}>TodoAPP</a>
      </div>
      <ul className="flex flex-col pt-10 items-center gap-18 md:gap-20 cursor-pointer font-bold md:flex-row md:pt-0">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Todo</a>
        </li>
        <li>
          <a href="/">Sign Up</a>
        </li>
        <li>
          <a href="/">Sign In</a>
        </li>
        <li>
          <a href="/">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
