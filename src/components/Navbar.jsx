import React from "react";
import { Menu, X, User, ChevronRight } from "lucide-react";
import logo1 from "../assets/stream.png";

const Navbar = () => {

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* Left - Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img
              src={logo1}
              alt="LiveBlast Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              LiveBlast
            </span>
          </div>

          {/* Right - Sign In (Desktop) */}
          <div className="hidden md:flex items-center">
            <button className="flex items-center space-x-2 px-5 py-2 rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">
              <User className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-800">Sign In</span>
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>

          {/* Mobile Sign In + Menu */}
          <div className="flex items-center space-x-2 md:hidden">
            <button className="flex items-center space-x-1 px-3 py-1.5 text-sm rounded-full border border-gray-200 hover:bg-gray-50 transition">
              <User className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-800">Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;