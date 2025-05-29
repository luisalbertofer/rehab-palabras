import React from "react";
import { Link } from "react-router-dom";

const trainingModes = [
  {
    path: "/training",
    title: "🧠 Adivina la Palabra",
    description: "Escucha una palabra y elige cuál crees que es.",
  },
  {
    path: "/training/frases",
    title: "🗣️ Comprensión de Frases",
    description: "Escucha frases breves y reconoce cuál has oído.",
  },
  {
    path: "/training/fonologico",
    title: "🔤 Discriminación Fonológica (Consonantes)",
    description: "Escucha una palabra y elige entre pares mínimamente distintos como /p/ vs /b/.",
  },
  {
    path: "/training/fonologico-vocales",
    title: "🗣️ Discriminación Fonológica (Vocales)",
    description: "Escucha una palabra con contraste vocálico y selecciona la correcta.",
  },
];

const Home = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-4">🎧 Rehabilitación Auditiva</h1>
      <p className="text-center text-gray-600 mb-10 text-lg">
        Elige un modo de entrenamiento para comenzar a trabajar tu escucha y reconocimiento auditivo.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {trainingModes.map((mode) => (
          <Link
            to={mode.path}
            key={mode.path}
            className="border border-gray-300 rounded-xl p-6 shadow-md hover:shadow-xl bg-white transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold mb-2">{mode.title}</h2>
            <p className="text-gray-700">{mode.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
