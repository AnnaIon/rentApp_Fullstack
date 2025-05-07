import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// Importing icons from Heroicons
import {
  HomeIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  HeartIcon,
  InboxIcon,
  UsersIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  // Access auth context values
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Logout handler: clears auth cookie and redirects to login page
  const handleLogout = () => {
    logout();
    navigate("/authentication/login");
  };

  // Optional effect placeholder for user-related logic
  useEffect(() => {}, [user]);

  // If not logged in, redirect to auth page
  if (!user) return <Navigate to="/authentication" />;

  const isAdmin = user?.role === "admin";

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* App logo */}
      <img src="/gold_logo.png" alt="Logo" className="h-10" />

      {/* Greeting */}
      <div className="text-gray-800 text-sm sm:text-base font-medium tracking-wide">
        Hello,{" "}
        <span className="text-orange-600 font-semibold">{user.firstName}</span>
      </div>

      {/* Navigation links */}
      <nav>
        <ul className="flex items-center gap-6 text-gray-600">
          <li>
            <NavLink to="/homepage" className="hover:text-orange-600 transition">
              <HomeIcon className="w-6 h-6" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/myprofile" className="hover:text-orange-600 transition">
              <UserCircleIcon className="w-6 h-6" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/myflats" className="hover:text-orange-600 transition">
              <BuildingOfficeIcon className="w-6 h-6" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/favourites" className="hover:text-orange-600 transition">
              <HeartIcon className="w-6 h-6" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/inbox" className="hover:text-orange-600 transition">
              <InboxIcon className="w-6 h-6" />
            </NavLink>
          </li>

          {/* Admin-only link */}
          {isAdmin && (
            <li>
              <NavLink to="/all-users" className="hover:text-orange-600 transition">
                <UsersIcon className="w-6 h-6" />
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="text-red-500 hover:text-red-700 transition duration-150"
        title="Logout"
      >
        <ArrowRightOnRectangleIcon className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Navbar;
