import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useNav } from "../../hooks";

const Nav = () => {
  const {
    isUserLoggedIn,
    handleLogout,
    handleProfileClick,
    handleTodoClick,
    showMenu,
    userName,
  } = useNav();
  return (
    <nav className="flex flex-col items-center justify-around px-5 py-5 bg-[#F8F9FA] md:flex-row">
      <div>
        <Link
          to="/"
          className="font-bold text-3xl"
          style={{ color: "#FF9000" }}
        >
          Task Manager
        </Link>
      </div>
      <ul className="flex flex-col pt-10 items-center gap-18 md:gap-20 cursor-pointer font-bold md:flex-row md:pt-0">
        <Link to="/">Home</Link>
        <Link to="#" onClick={handleTodoClick}>
          Task
        </Link>
        {isUserLoggedIn ? (
          <div className="relative dropdown">
            {/* Profile Icon */}
            <FaUserCircle
              size={32} // Icon size
              className="text-gray-700 cursor-pointer"
              onClick={handleProfileClick}
            />

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
                <div className="p-4 border-b text-gray-700 font-semibold whitespace-nowrap">
                  {userName} {/* Display full name or a default value */}
                </div>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/register">Sign Up</Link>
            <Link to="/login">Sign In</Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
