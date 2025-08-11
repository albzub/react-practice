import React, { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  user?: { email: string } | null;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="inline-block h-8 w-8 rounded-lg bg-white/20" />
            <span className="text-white font-semibold text-lg tracking-wide">
              Posts
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-white focus:outline-none hover:text-sky-100"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-white focus:outline-none hover:text-sky-100"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-gray-200 text-sm hidden lg:inline">
                  {user.email}
                </span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Toggle menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="w-full text-center px-4 py-2 rounded-md text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 shadow-md"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="w-full text-center px-4 py-2 rounded-md text-white border border-white/30 hover:bg-white/10"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-gray-200 text-sm px-1">{user.email}</span>
                  <button
                    onClick={() => {
                      onLogout?.();
                      setOpen(false);
                    }}
                    className="w-full text-center px-4 py-2 rounded-md text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 shadow-md"
                  >
                    Log Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
