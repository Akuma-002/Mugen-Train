import { useContext, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "./context/LoginInfo";
import { UserContext } from "./context/UserInfo";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const {login} = useContext(LoginContext);
  const{user} = useContext(UserContext);
  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
<nav className="fixed top-0 left-0 z-50 flex justify-between items-center px-6 py-4 text-white text-sm bg-transparent w-full">
      {/* Logo */}
  <NavLink className="y-2 x-2 border-2 border-secondary rounded-full bg-white" to={"/"}>
        <img src="/logo.png" alt="RailBook Logo" width="40" height="40" className="h-10 w-10 object-contain" />
      </NavLink>

      {/* Desktop Menu */}
  <div className="hidden md:flex items-center ml-7 space-x-6">
        {["Home", "My Bookings", "Contact"].map((item) => (
          <NavLink
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="relative overflow-hidden h-6 group text-black hover:text-secondary"
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
      
      <div className={`ml-14 items-center space-x-8 
        ${login ? "hidden" : "flex md:flex"}`}>
        <button
          onClick={() => navigate('/login')}
          className="border border-secondary text-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-full text-sm font-medium transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary/80 transition duration-300"
        >
          Sign Up
        </button>
      </div>
  <div className={`userLogo ${login ? "flex md:flex" : "hidden" }`} >
  <span><NavLink to={"/user"}><div className="avatar w-12 h-12 flex items-center justify-center border-2 border-secondary rounded-full bg-secondary text-white text-4xl font-bold">
      <p>{user?.name?.charAt(0)?.toUpperCase() || "U"}</p>
    </div></NavLink></span>
  </div>


      {/* Mobile Toggle */}
      <button
        id="menuToggle"
        className="md:hidden text-secondary ml-auto"
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
        className={`absolute top-full left-0 bg-primary w-full flex-col items-center gap-4 md:hidden text-base ${
          isMobileOpen ? "flex" : "hidden"
        } py-4`}
      >
        <div className="flex flex-col items-center space-y-4">
          {["Products", "Customer Stories", "Pricing", "Docs"].map((item) => (
            <a key={item} className="hover:text-secondary text-white" href="#">
              {item}
            </a>
          ))}
          <div className="flex flex-col w-full items-center space-y-4">
            <button className="border border-secondary text-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-full text-sm font-medium transition w-full">
              Contact
            </button>
            <button className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary/80 transition duration-300 w-full">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
