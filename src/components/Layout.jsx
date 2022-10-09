import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="h-full bg-gray-100 overflow-x-hidden py-5 dark:bg-dark-900">
        <div className="layout h-full dark:bg-dark-900">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
