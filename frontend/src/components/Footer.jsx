import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 w-full">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 max-w-screen-2xl mx-auto">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-tram-front h-6 w-6"
              >
                <rect width="16" height="16" x="4" y="3" rx="2"></rect>
                <path d="M4 11h16"></path>
                <path d="M12 3v8"></path>
                <path d="m8 19-2 3"></path>
                <path d="m18 22-2-3"></path>
                <path d="M8 15h.01"></path>
                <path d="M16 15h.01"></path>
              </svg>
              <span className="text-xl font-bold">Mugen Train</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Your trusted partner for comfortable and reliable train travel across the nation.
            </p>
            <div className="flex space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook h-5 w-5 hover:text-secondary cursor-pointer transition-colors"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter h-5 w-5 hover:text-secondary cursor-pointer transition-colors"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram h-5 w-5 hover:text-secondary cursor-pointer transition-colors"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="/book-ticket" className="hover:text-secondary transition-colors">
                  Book Ticket
                </a>
              </li>
              <li>
                <a href="/my-bookings" className="hover:text-secondary transition-colors">
                  My Bookings
                </a>
              </li>
              <li>
                <a href="/train-status" className="hover:text-secondary transition-colors">
                  Train Status
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="hover:text-secondary transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="/help-center" className="hover:text-secondary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-secondary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-secondary transition-colors">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-phone h-4 w-4"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+91 96473 97722</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail h-4 w-4"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>sksahilu735@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
  <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60 px-4">
          <p>© 2024 Mugen Train. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
