// src/components/AudioButton.jsx
import React from "react";

const AudioButton = ({ word, group }) => {
  const playAudio = () => {
    // Ajusta la ruta para incluir el prefijo base de GitHub Pages
    const basePath = import.meta.env.BASE_URL; // Esto toma el valor de "base" en vite.config.js
    const path = `${basePath}audios/${group}/${word}.mp3`;

    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error("No encontrado");
        new Audio(path).play();
      })
      .catch(() => {
        alert("⚠️ Este audio no está disponible aún.");
      });
  };

  return (
    <button
      onClick={playAudio}
      className="group bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 hover:scale-105 transition transform duration-200"
    >
      <span className="group-hover:animate-pulse">🔊</span> Escuchar audio
    </button>
  );
};

export default AudioButton;