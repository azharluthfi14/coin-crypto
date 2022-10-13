import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useStateContext();

  const navLink = ["Markets", "Trade", "Earn", "Finance", "NFT"];

  return (
    <nav
      className="border-b sticky top-0 z-10 flex items-center
     bg-white w-full h-16 dark:bg-dark-900 dark:border-dark-600"
    >
      <div className="layout flex justify-between items-center">
        <div className="flex flex-row items-center space-x-20">
          <Link className="font-bold text-slate-800 text-xl" to="/">
            <span className="dark:text-gray-200">Coinancy.</span>
            <span className="text-violet-500">com</span>
          </Link>
          <ul className="hidden md:flex flex-row items-center space-x-8">
            {navLink.map((item) => (
              <li key={item}>
                <Link
                  to="/"
                  className="text-sm hover:text-violet-500 dark:text-gray-300 hover:dark:text-violet-500"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`flex justify-center items-center p-2 rounded ${
              theme === "dark"
                ? "text-yellow-400 dark:bg-dark-700"
                : "text-gray-400 bg-gray-200"
            }`}
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
