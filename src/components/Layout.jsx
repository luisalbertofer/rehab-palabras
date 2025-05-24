import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <Navbar />
      </header>

      <main className="p-6">
        <Outlet />
      </main>

      <footer className="text-center text-sm text-gray-500 py-4">
        &copy; {new Date().getFullYear()} Luis Alberto — Proyecto de Rehabilitación Auditiva
      </footer>
    </div>
  );
};

export default Layout;
