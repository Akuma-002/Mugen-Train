import { useContext, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "./context/LoginInfo";
import { UserContext } from "./context/UserInfo";
import { DesignContext } from "./context/DesignInfo";
import styled from 'styled-components';
const StyledWrapper = styled.div`
  button,
  button:focus {
    font-size: 17px;
    padding: 10px 25px;
    border-radius: 0.7rem;
    background-image: linear-gradient(rgb(214, 202, 254), rgb(158, 129, 254));
    border: 2px solid rgb(50, 50, 50);
    border-bottom: 5px solid rgb(50, 50, 50);
    box-shadow: 0px 1px 6px 0px rgb(158, 129, 254);
    transform: translate(0, -3px);
    cursor: pointer;
    transition: 0.2s;
    transition-timing-function: linear;
  }

  button:active {
    transform: translate(0, 0);
    border-bottom: 2px solid rgb(50, 50, 50);
  }`;
  const StyledWrapper1 = styled.div`
  .button {
    position: relative;
    padding: 10px 22px;
    border-radius: 6px;
    border: none;
    color: #fff;
    cursor: pointer;
    background-color: #7d2ae8;
    transition: all 0.2s ease;
  }

  .button:active {
    transform: scale(0.96);
  }

  .button:before,
  .button:after {
    position: absolute;
    content: "";
    width: 150%;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
    z-index: -1000;
    background-repeat: no-repeat;
  }

  .button:hover:before {
    top: -70%;
    background-image: radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, #7d2ae8 20%, transparent 30%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #7d2ae8 15%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
      10% 10%, 18% 18%;
    background-position: 50% 120%;
    animation: greentopBubbles 0.6s ease;
  }

  @keyframes greentopBubbles {
    0% {
      background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
        40% 90%, 55% 90%, 70% 90%;
    }

    50% {
      background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
        50% 50%, 65% 20%, 90% 30%;
    }

    100% {
      background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
        50% 40%, 65% 10%, 90% 20%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  }

  .button:hover::after {
    bottom: -70%;
    background-image: radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #7d2ae8 15%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%),
      radial-gradient(circle, #7d2ae8 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%, 18% 18%;
    background-position: 50% 0%;
    animation: greenbottomBubbles 0.6s ease;
  }

  @keyframes greenbottomBubbles {
    0% {
      background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
        70% -10%, 70% 0%;
    }

    50% {
      background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
        105% 0%;
    }

    100% {
      background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
        110% 10%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  }`;

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  const { design } = useContext(DesignContext);
  const location = useLocation();
  // 🔹 Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };
  return (
    <nav
      className={`fixed top-0 left-0 z-50 flex justify-between items-center px-6 py-4 text-sm w-full transition-all duration-300
        ${(location.pathname === "/")? (scrolled? "bg-primary text-white shadow-md" : "bg-transparent text-black"):"bg-primary text-white shadow-md"}
      `}
    >
      {/* Logo */}
      <NavLink
        className="y-2 x-2 border-2 border-secondary rounded-full bg-white"
        to={"/"}
      >
        <img
          src="/logo.png"
          alt="RailBook Logo"
          width="40"
          height="40"
          className="h-10 w-10 object-contain"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center ml-7 space-x-6">
        {["Home", "My Bookings", "Contact"].map((item) => (
          <NavLink
            key={item}
            to={
              item === "Home"
                ? "/"
                : `/${item.toLowerCase().replace(/\s+/g, "-")}`
            }
            className={`relative overflow-hidden h-6 group hover:text-secondary transition-colors duration-300`}
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
      <div
        className={`ml-14 items-center space-x-8 ${
          login ? "hidden" : "flex md:flex"
        }`}
      >
        <StyledWrapper>
        <button
          onClick={() => navigate("/login")}
          id="loginButton"
          className="border border-secondary text-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-full text-sm font-medium transition"
        >
          Login
        </button>
        </StyledWrapper>
        <StyledWrapper1>
        <button
          onClick={() => navigate("/signup")}
          id="signUpButton"
          className="button"
        >
          Sign Up
        </button>
        </StyledWrapper1>
      </div>

      {/* User Avatar */}
      <div className={`userLogo ${login ? "flex md:flex" : "hidden"}`}>
        <NavLink to={"/user"}>
          <div className="avatar w-12 h-12 flex items-center justify-center border-2 border-secondary rounded-full bg-secondary text-white text-4xl font-bold">
            <p>{user?.name?.charAt(0)?.toUpperCase() || "U"}</p>
          </div>
        </NavLink>
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
