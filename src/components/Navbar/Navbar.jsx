import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b sticky top-0 z-10 flex items-center bg-white w-full h-16">
      <div className="layout">
        <Link className="font-bold text-slate-800 text-xl" to="/">
          <span>Encrypto.</span>
          <span className="text-violet-500">com</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
