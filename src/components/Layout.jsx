import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="h-full bg-gray-100 py-10">
        <div className="layout">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
