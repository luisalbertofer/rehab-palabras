import React, { useEffect, useState } from "react";
import { wordGroups } from "../data/wordGroups";
import TrainingStats from "../components/TrainingStats";

const frases = wordGroups["frases_breves"] || [];

const getRandomOptions = (correct, all, n = 3) => {
  const set = new Set([correct]);
  while (set.size < n) {
    const rand = all[Math.floor(Math.random() * all.length)];
    set.add(rand);
  }
  return Array.from(set).sort(() => Math.random() - 0.5);
};

const TrainingFrases = () => {
  const [currentFrase, setCurrentFrase] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const [correctCount, setCorrectCount] = useState(() =>
    parseInt(localStorage.getItem("frases_correct") || "0")
  );
  const [incorrectCount, setIncorrectCount] = useState(() =>
    parseInt(localStorage.getItem("frases_incorrect") || "0")
  );

  useEffect(() => {
    localStorage.setItem("frases_correct", correctCount);
    localStorage.setItem("frases_incorrect", incorrectCount);
  }, [correctCount, incorrectCount]);

  const handleResetStats = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
    localStorage.removeItem("frases_correct");
    localStorage.removeItem("frases_incorrect");
  };

  const pickNewFrase = () => {
    const frase = frases[Math.floor(Math.random() * frases.length)];
    const opts = getRandomOptions(frase, frases);
    setCurrentFrase(frase);
    setOptions(opts);
    setSelected(null);
    setResult(null);
  };

  useEffect(() => {
    if (frases.length > 0) pickNewFrase();
  }, []);

  const handleOptionClick = (option) => {
    setSelected(option);
    const isCorrect = option === currentFrase;
    setResult(isCorrect ? "✅ ¡Correcto!" : "❌ Incorrecto");
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }
  };

  const playAudio = () => {
    const file = currentFrase
      .toLowerCase()
      .replace(/[¿?¡!.,]/g, "")
      .replace(/\s+/g, "_");

    const path = `/audios/frases_breves/${file}.mp3`;
    const audio = new Audio(path);
    audio.play();
  };

  return (
      <div className="p-6 max-w-xl mx-auto text-center space-y-6">
        <h1 className="text-2xl font-bold">🗣️ Entrenamiento con Frases</h1>

        <div>
          <p className="mb-2">Escucha la frase y selecciona la correcta:</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={playAudio}
          >
            🔊 Reproducir frase
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {options.map((option) => (
            <button
              key={option}
              className={`border px-4 py-2 rounded ${
                selected
                  ? option === currentFrase
                    ? "bg-green-200"
                    : option === selected
                    ? "bg-red-200"
                    : "bg-gray-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleOptionClick(option)}
              disabled={selected !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {result && <p className="text-lg font-semibold">{result}</p>}

        <div>
          <button
            className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={pickNewFrase}
          >
            ▶️ Siguiente
          </button>
        </div>

        <TrainingStats
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          onReset={handleResetStats}
        />
      </div>
  );
};

export default TrainingFrases;
