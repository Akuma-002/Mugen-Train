import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 flex items-center border border-slate-700 px-6 py-4 rounded-b-md text-white text-sm bg-black">
      {/* Logo */}
      <a href="https://prebuiltui.com">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="4.706" cy="16" r="4.706" fill="#D9D9D9" />
          <circle cx="16.001" cy="4.706" r="4.706" fill="#D9D9D9" />
          <circle cx="16.001" cy="27.294" r="4.706" fill="#D9D9D9" />
          <circle cx="27.294" cy="16" r="4.706" fill="#D9D9D9" />
        </svg>
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center ml-7 space-x-6">
        {["Home", "Book Ticket", "My Bookings", "Contact"].map((item) => (
          <NavLink
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="relative overflow-hidden h-6 group"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              {item}
            </span>
            <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
              {item}
            </span>
          </NavLink>
        ))}
      </div>

      {/* Desktop Buttons */}
  <div className="hidden ml-14 md:flex items-center space-x-8">
        <button onClick={() => navigate('/login')} className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition">
          Login
        </button>
        <button onClick={() => navigate('/signup')} className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
          Sign Up
        </button>
      </div>

      {/* Mobile Toggle */}
      <button
        id="menuToggle"
        className="md:hidden text-gray-600 ml-auto"
        onClick={toggleMobileMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        id="mobileMenu"
        className={`absolute top-full left-0 bg-black w-full flex-col items-center gap-4 md:hidden text-base ${
          isMobileOpen ? "flex" : "hidden"
        } py-4`}
      >
        <div className="flex flex-col items-center space-y-4">
          {["Products", "Customer Stories", "Pricing", "Docs"].map((item) => (
            <a key={item} className="hover:text-indigo-600" href="#">
              {item}
            </a>
          ))}
          <div className="flex flex-col w-full items-center space-y-4">
            <button className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition w-full">
              Contact
            </button>
            <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300 w-full">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
