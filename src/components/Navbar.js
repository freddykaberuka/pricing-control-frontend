import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images.jpeg'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex justify-between items-center text-xs flex-wrap relative">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12" />
        <div className="text-gray-500 ml-5">-Your Price, Our Priority</div>
      </div>
      <div className="block lg:hidden">
        {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div onClick={() => setIsOpen(!isOpen)}>
          <svg
            className={`fill-current h-6 w-6 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-6 w-6 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </div>
      </div>
      <div
        className={`absolute top-14 lg:relative lg:top-0 bg-white-500 text-dark-green w-full font-bold flex-col items-center space-y-3 border-b-2 pb-4 border-b-gray-200 lg:pb-0 lg:space-y-0 lg:border-b-0 lg:flex lg:flex-row lg:space-x-8 lg:w-auto ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <a href="/">Home</a>
        <a href="">Contact Us</a>
        <Link to="/signin">
        <div className="bg-gray-500 px-5 py-2 text-xs rounded">LOGIN</div></Link>
      </div>
    </nav>
  );
}

export default Navbar