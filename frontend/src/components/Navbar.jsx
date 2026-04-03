import React, { useState } from "react";
import Logo from "../assets/property.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const token = localStorage.getItem("token"); // check login

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
            <img className="h-10 w-auto" src={Logo} alt="Adam's Real Estate" />
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</a>
            <a href="/properties" className="text-gray-700 hover:text-indigo-600 font-medium">Properties</a>
            <a href="/about" className="text-gray-700 hover:text-indigo-600 font-medium">About</a>
            <a href="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">Contact</a>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">

            {/* Add Property (always visible) */}
            <button
              onClick={() => navigate("/auth")}
              className="px-4 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
            >
              Add Property
            </button>

            {/* NOT LOGGED IN */}
            {!token ? (
              <button
                onClick={() => navigate("/auth")}
                className="px-4 py-2 rounded-full border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition"
              >
                Login / SignUp
              </button>
            ) : (
              /* LOGGED IN USER */
              <div className="relative">
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer"
                >
                  👤
                </div>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;