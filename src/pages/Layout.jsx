import { Outlet, Link } from "react-router-dom";
import React, { useContext } from "react";

import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../context/AuthSlice";
const Layout = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated.value);
  const dispatch = useDispatch();

  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <div className="px-3 py-2 font-bold">Peminjaman Alat Tekkom</div>
          <div className="flex space-x-10">
            <div className="hover:bg-gray-700 px-3 py-2 rounded">
              <Link to="/">Beranda</Link>
            </div>
            <div className="hover:bg-gray-700 px-3 py-2 rounded">
              <Link to="/contact">Kontak</Link>
            </div>

            <Login />
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
