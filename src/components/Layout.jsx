import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useGetCoinsQuery } from "../api/coinApi";
import Navbar from "./Header/Navbar";
import Stats from "./Header/Stats";

const Layout = () => {
  return (
    <>
      <header className="sticky top-0 z-30">
        <Navbar />
        <Stats />
      </header>
      <div className="h-full bg-gray-100 overflow-x-hidden py-5 dark:bg-dark-900">
        <div className="layout dark:bg-dark-900">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
