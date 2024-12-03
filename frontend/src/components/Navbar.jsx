import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-gray-300 transition duration-200">
            FIT
          </Link>
        </h1>

        {/* Navigation Links */}
        <ul className="flex space-x-6 items-center">
          {isAuthenticated ? (
            <>
              {/* Authenticated User Menu */}
              <li>
                <NavLink
                  to="/workout-manager"
                  className={({ isActive }) =>
                    `text-lg font-medium ${
                      isActive ? "text-blue-400" : "hover:text-gray-300"
                    } transition duration-300`
                  }
                >
                  Workout Manager
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/workout-history"
                  className={({ isActive }) =>
                    `text-lg font-medium ${
                      isActive ? "text-blue-400" : "hover:text-gray-300"
                    } transition duration-300`
                  }
                >
                  Workout History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/goal-setting"
                  className={({ isActive }) =>
                    `text-lg font-medium ${
                      isActive ? "text-blue-400" : "hover:text-gray-300"
                    } transition duration-300`
                  }
                >
                  Goal Setting
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/analytics"
                  className={({ isActive }) =>
                    `text-lg font-medium ${
                      isActive ? "text-blue-400" : "hover:text-gray-300"
                    } transition duration-300`
                  }
                >
                  Analytics
                </NavLink>
              </li>
              <li>
                <span className="text-sm font-medium">
                  {`Hello, ${user?.displayName || user?.email}`}
                </span>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-lg font-medium bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition duration-300"
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Guest Menu */}
              <li>
                <button
                  onClick={() => navigate("/login")}
                  className="text-lg font-medium bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 transition duration-300"
                >
                  Log In
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
