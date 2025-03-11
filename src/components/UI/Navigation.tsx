import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Handle scrolling behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY <= 0); // Check if user is at the very top

      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Hide when scrolling down
      } else {
        setIsVisible(true); // Show when scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Hide the navigation on the dashboard page
  if (location.pathname === "/dashboard") {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full transition-transform duration-300 z-10 ${
        isVisible ? "translate-y-[10px]" : "-translate-y-full"
      } ${isAtTop ? "bg-transparent text-white" : "bg-white shadow-md rounded-full"}`}
    >
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/home" aria-label="Home" className="text-[1.7rem] font-bold">
            My Todo List
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="24"
            height="24"
            stroke="currentColor"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Navbar Links for Desktop */}
        <div className={`hidden md:flex space-x-6`}>
          <Link to="/features" className="hover:text-gray-300">
            Features
          </Link>
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>

          <div className="relative border-l-2 pl-2">
            <Link to="/login" className=" font-bold hover:text-gray-300">
              Log In
            </Link>
            <Link to="/signup" className="text-black rounded-md p-2 ml-1.5 bg-white font-bold hover:bg-[#0A122A] hover:text-white transition-all">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Links */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } absolute top-full left-0 bg-white shadow-md w-full md:hidden`}
        >
          <Link
            to="/features"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            Features
          </Link>
          <Link
            to="/teamwork"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            For Teams
          </Link>
        </div>
      </nav>
    </div>
  );
};
