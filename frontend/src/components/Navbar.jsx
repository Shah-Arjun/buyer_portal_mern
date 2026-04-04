import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/authServices";
import { Heart } from "lucide-react";
import Logo from "../assets/property.png";

function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [favouritesCount, setFavouritesCount] = useState(0);

  // Lazy load user from localStorage
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
        return null;
      }
    }
    return null;
  });

  // Fetch favourites count
  useEffect(() => {
    const fetchFavouritesCount = async () => {
      if (!user) {
        setFavouritesCount(0);
        return;
      }

      try {
        const res = await API.get("/favourites");
setFavouritesCount(res.data.favourites?.length || 0);      } catch (err) {
        if (err.response?.status === 404) {
          console.warn("Favourites endpoint (/favourites) not implemented yet on backend");
          setFavouritesCount(0);
        } else {
          console.error("Failed to fetch favourites count:", err);
          setFavouritesCount(0);
        }
      }
    };

    fetchFavouritesCount();

    // Listen for updates from Card component
    const handleFavouritesUpdate = () => fetchFavouritesCount();
    window.addEventListener("favouritesUpdated", handleFavouritesUpdate);

    return () => {
      window.removeEventListener("favouritesUpdated", handleFavouritesUpdate);
    };
  }, [user]); // Re-run when user changes (login/logout)

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setFavouritesCount(0);
    navigate("/auth");
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
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
          <div className="hidden md:flex items-center gap-4">

            {/* Become Seller Button */}
            <button
              onClick={() => navigate("/add-property")}
              className="px-5 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
            >
              Become Seller
            </button>

            {/* Favourites Button */}
            {user && (<button
              onClick={() => navigate("/dashboard")}
              className="relative flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500 transition rounded-full hover:bg-gray-100"
            >
              <Heart className="w-6 h-6" />
              {favouritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {favouritesCount}
                </span>
              )}
              <span className="hidden sm:inline font-medium">Favourites</span>
            </button>
          )}


            {/* Auth Section */}
            {!user ? (
              <button
                onClick={() => navigate("/auth")}
                className="px-5 py-2 rounded-full border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition"
              >
                Login / Sign Up
              </button>
            ) : (
              <div
                className="flex items-center gap-2.5 cursor-pointer py-1 px-2 rounded-xl hover:bg-gray-100 transition relative"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>

                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                  {getInitial(user.name)}
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-0 mt-14 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl py-1 z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2.5 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50"
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