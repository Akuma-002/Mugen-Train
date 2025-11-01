import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-primary/90 via-primary to-primary/90 text-white py-16 w-full overflow-hidden">
      {/* Decorative grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px)] bg-[size:40px] opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px] opacity-20"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-300 group-hover:bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="16" height="16" x="4" y="3" rx="2"></rect>
                  <path d="M4 11h16"></path>
                  <path d="M12 3v8"></path>
                  <path d="m8 19-2 3"></path>
                  <path d="m18 22-2-3"></path>
                  <path d="M8 15h.01"></path>
                  <path d="M16 15h.01"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Mugen Train
              </span>
            </div>
            <p className="text-white/80 leading-relaxed backdrop-blur-sm">
              Your trusted partner for comfortable and reliable train travel across the nation.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              {['facebook', 'twitter', 'instagram'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="p-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-300 group"
                >
                  <svg
                    className="h-5 w-5 transform transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Keep your existing SVG paths for each social icon */}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-white/20 rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Book Ticket', path: '/book-ticket' },
                { name: 'My Bookings', path: '/my-bookings' },
                { name: 'Train Status', path: '/train-status' },
                { name: 'Refund Policy', path: '/refund-policy' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center text-white/80 hover:text-white transition-all duration-300"
                  >
                    <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300">
                      →
                    </span>
                    <span className="ml-2">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section - Similar structure as Quick Links */}
          {/* ... Copy the Quick Links structure and modify content ... */}

          {/* Contact Info Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-white/20 rounded-full"></span>
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+919647397722"
                className="flex items-center space-x-3 group p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/></svg>
                  </svg>
                </div>
                <span className="text-white/80 group-hover:text-white transition-colors">
                  +91 96473 97722
                </span>
              </a>
              {/* Email contact - Similar structure as phone */}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Mugen Train. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Made with ♥ in India
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;