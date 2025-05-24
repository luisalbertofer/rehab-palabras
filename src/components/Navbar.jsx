import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-blue-100 flex gap-6 shadow-md">
      <Link to="/" className="font-semibold text-blue-700 hover:underline">
        Inicio
      </Link>
      <Link to="/admin" className="font-semibold text-blue-700 hover:underline">
        Panel Admin
      </Link>
      <Link to="/training" className="font-semibold text-blue-700 hover:underline">
        Entrenamiento Auditivo
      </Link>
      <Link to="/training/frases" className="font-semibold text-blue-700 hover:underline">
        Entrenamiento con Frases  
      </Link>
    </nav>
  );
};

export default Navbar;
