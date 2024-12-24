import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authServices } from "../../auth";

const Nav = () => {
  const navigate=useNavigate();
  const isUserLoggedIn=authServices.isUserLoggedIn();
  const handleTodoClick=(e)=>{
    e.preventDefault();
    if(isUserLoggedIn){
      navigate("/todo")
    }
    else{
      navigate("/login")
    }
  }
  return (
    <nav className="flex flex-col items-center justify-around px-5 py-5 bg-[#F8F9FA] md:flex-row">
      <div>
        <Link to="/" className="font-bold text-3xl" style={{color: '#FF9000'}}>TodoAPP</Link>
      </div>
      <ul className="flex flex-col pt-10 items-center gap-18 md:gap-20 cursor-pointer font-bold md:flex-row md:pt-0">
        <Link to="/">
          Home
        </Link>
        <Link to="#" onClick={handleTodoClick}>
          Todo
        </Link>
        <Link to="/register">
          Sign Up
        </Link>
        <Link to="/login">
          Sign In
        </Link>
        {/* <Link to="/">
          Logout
        </Link> */}
      </ul>
    </nav>
  );
};

export default Nav;
