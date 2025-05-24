import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Inicio", icon: "🏠" },
    { to: "/training", label: "Auditivo", icon: "🎧" },
    { to: "/training/frases", label: "Frases", icon: "🗣️" },
    { to: "/training/fonologico", label: "Fonológico Consonantes", icon: "🧩" },
    { to: "/training/fonologico-vocales", label: "Fonológico Vocales", icon: "🔤" }
  ];

  return (
    <nav className="p-4 bg-blue-100 flex gap-4 sm:gap-6 justify-center shadow-md flex-wrap">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`px-3 py-1 rounded font-semibold transition-all ${
            pathname === link.to
              ? "bg-blue-600 text-white shadow"
              : "text-blue-700 hover:underline hover:text-blue-900"
          }`}
        >
          <span className="mr-1">{link.icon}</span> {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
