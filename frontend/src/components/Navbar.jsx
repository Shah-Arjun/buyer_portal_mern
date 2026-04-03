// src/components/Header.jsx
import React from "react";
import Logo from "../assets/property.png";

function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* logo */}
          <div className="flex-shrink-0">
            <img className="h-10 w-auto" src={Logo} alt="Adam's Real Estate" />
          </div>

          {/* nav links */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-indigo-600 font-medium">
              Home
            </a>
            <a href="#properties" className="text-gray-700 hover:text-indigo-600 font-medium">
              Properties
            </a>
            <a href="#about" className="text-gray-700 hover:text-indigo-600 font-medium">
              About Us
            </a>
            <a href="#contact" className="text-gray-700 hover:text-indigo-600 font-medium">
              Contact
            </a>
          </nav>

          {/* buttons */}
          <div className="hidden md:flex space-x-4">
            <a
              href="/auth"
              className="px-4 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
            >
              Add Property
            </a>
            <a
              href="/auth"
              className="px-4 py-2 rounded-full bg-white border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition"
            >
              Login
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            {/* Add hamburger menu here if needed */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;